// generated using <%= appname %> <%= appversion %>
const { src, dest, watch, series, parallel, lastRun } = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
<%_ if (includeModernizr) { -%>
const fs = require('fs');
    const mkdirp = require('mkdirp');
    const Modernizr = require('modernizr');
<%_ } -%>
const browserSync = require('browser-sync');
const del = require('del');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const { argv } = require('yargs');

const $ = gulpLoadPlugins();
const server = browserSync.create();

const port = argv.port || 9000;

const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const isDev = !isProd && !isTest;

function styles() {
  <%_ if (includeSass) { -%>
  return src('src/assets/styles/*.scss', {
        sourcemaps: !isProd,
    })
            .pipe($.plumber())
            .pipe($.sass.sync({
                outputStyle: 'expanded',
                precision: 10,
                includePaths: ['.']
            }).on('error', $.sass.logError))
    <%_ } else {-%>
  return src('src/assets/styles/*.css', {
        sourcemaps: !isProd,
    })
    <%_ } -%>
    .pipe($.postcss([
        autoprefixer()
    ]))
            .pipe(dest('.tmp/styles', {
                sourcemaps: !isProd,
            }))
            .pipe(server.reload({ stream: true }));
};

function scripts() {
    return src('src/assets/scripts/**/*.js', {
        sourcemaps: !isProd,
    })
        .pipe($.plumber())
        .pipe($.babel())
        .pipe(dest('.tmp/scripts', {
            sourcemaps: !isProd ? '.' : false,
        }))
        .pipe(server.reload({ stream: true }));
};

<%_ if (includeModernizr) { -%>
    async function modernizr() {
        const readConfig = () => new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/modernizr.json`, 'utf8', (err, data) => {
                if (err) reject(err);
                resolve(JSON.parse(data));
            })
        })
        const createDir = () => new Promise((resolve, reject) => {
            mkdirp(`${__dirname}/.tmp/scripts`, err => {
                if (err) reject(err);
                resolve();
            })
        });
        const generateScript = config => new Promise((resolve, reject) => {
            Modernizr.build(config, content => {
                fs.writeFile(`${__dirname}/.tmp/scripts/modernizr.js`, content, err => {
                    if (err) reject(err);
                    resolve(content);
                });
            })
        });

        const [config] = await Promise.all([
            readConfig(),
            createDir()
        ]);
        await generateScript(config);
    }
<%_ } -%>

const lintBase = files => {
    return src(files)
        .pipe($.eslint({ fix: true }))
        .pipe(server.reload({ stream: true, once: true }))
        .pipe($.eslint.format())
        .pipe($.if(!server.active, $.eslint.failAfterError()));
}
function lint() {
    return lintBase('src/assets/scripts/**/*.js')
        .pipe(dest('src/assets/scripts'));
};
function lintTest() {
    return lintBase('test/spec/**/*.js')
        .pipe(dest('test/spec'));
};

function html() {
    return src('src/*.html')
        .pipe($.useref({ searchPath: ['.tmp', 'src', '.'] }))
        .pipe($.if(/\.js$/, $.uglify({ compress: { drop_console: true } })))
        .pipe($.if(/\.css$/, $.postcss([cssnano({ safe: true, autoprefixer: false })])))
        .pipe($.if(/\.html$/, $.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: { compress: { drop_console: true } },
            processConditionalComments: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        })))
        .pipe(dest('dist'));
}

function images() {
    return src('src/assets/images/**/*', { since: lastRun(images) })
        .pipe($.imagemin())
        .pipe(dest('src/assets/images'));
};

function fonts() {
    return src('src/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe($.if(!isProd, dest('.tmp/fonts'), dest('src/assets/fonts')));
};

function extras() {
    return src([
        'src/*',
        '!src/*.html'
    ], {
        dot: true
    }).pipe(dest('src'));
};

function clean() {
    return del(['.tmp', 'src'])
}

function measureSize() {
    return src('src/**/*')
        .pipe($.size({ title: 'build', gzip: true }));
}

const build = series(
    clean,
    parallel(
        lint,
    <%_ if (includeModernizr) { -%>
        series(parallel(styles, scripts, modernizr), html),
    <%_ } else { -%>
        series(parallel(styles, scripts), html),
    <%_ } -%>
    images,
    fonts,
    extras
   ),
   measureSize
);

function startAppServer() {
    server.init({
        notify: false,
        port,
        server: {
            baseDir: ['.tmp', 'src'],
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    });

    watch([
        'src/*.html',
        'src/images/**/*',
        '.tmp/fonts/**/*'
    ]).on('change', server.reload);

    <%_ if (includeSass) { -%>
            watch('src/assets/styles/**/*.scss', styles);
    <%_ } else { -%>
            watch('src/assets/styles/**/*.css', styles);
    <%_ } -%>
            watch('src/assets/scripts/**/*.js', scripts);
    <%_ if (includeModernizr) { -%>
            watch('modernizr.json', modernizr);
    <%_ } -%>
        watch('src/assets/fonts/**/*', fonts);
}

function startTestServer() {
    server.init({
        notify: false,
        port,
        ui: false,
        server: {
            baseDir: 'test',
            routes: {
                '/scripts': '.tmp/scripts',
                '/node_modules': 'node_modules'
            }
        }
    });

    watch('src/assets/scripts/**/*.js', scripts);
    watch(['test/spec/**/*.js', 'test/index.html']).on('change', server.reload);
    watch('test/spec/**/*.js', lintTest);
}

function startDistServer() {
    server.init({
        notify: false,
        port,
        server: {
            baseDir: 'dist',
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    });
}

let serve;
if (isDev) {
  <%_ if (includeModernizr) { -%>
        serve = series(clean, parallel(styles, scripts, modernizr, fonts), startAppServer);
  <%_ } else { -%>
        serve = series(clean, parallel(styles, scripts, fonts), startAppServer);
  <%_ } -%>
} else if (isTest) {
    serve = series(clean, scripts, startTestServer);
} else if (isProd) {
    serve = series(build, startDistServer);
}

exports.serve = serve;
exports.build = build;
exports.default = build;
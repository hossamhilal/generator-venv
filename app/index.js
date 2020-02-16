'use strict';

var Generator = require('yeoman-generator'), // use yeoman 
    mkdirp    = require('mkdirp'), // use to create folders 
    yosay     = require('yosay'), // use it to create awesome message to user insted of this.log()
    chalk     = require('chalk'), // use it to modify and style yosay message to user
    config    = require('./templates/config');

module.exports = class extends Generator {   

    // create Folders
    _createDirectors() {      
        var destRoot = this.destinationRoot() ;          // Project Folder   =>  '~/project'  
        mkdirp(destRoot + '/src');                       // create Src     Folder
        mkdirp(destRoot + '/src/assets');                // Create Assets  Folder
        mkdirp(destRoot + '/src/assets/styles');         // Create Styles  Folder
        mkdirp(destRoot + '/src/assets/fonts');          // Create Fonts   Folder 
        mkdirp(destRoot + '/src/assets/imgs');           // Create Imgs    Folder
        mkdirp(destRoot + '/src/assets/scripts');        // Create Scripts Folder
        mkdirp(destRoot + '/public');                    // Create Pubilc  Folder
        mkdirp(destRoot + '/src/components');            // Create Assets  Folder
    }

    // Install Packages From Packes.json 
    _installNpm() {    
        this.npmInstall();
    }

    // Create File System Function ( Copy , CopyTpl)
    _createPrjectFileSystem() {

        // Context for all values from user
        var templateContext = {                     
            appname: this.appname,                          // App Name
            appdescription: this.appdescription,            // App Description 
            appversion: this.appversion,                    // App Version 
            appauthor: this.appauthor,                      // App Author
            appemail: this.appemail,                        // Author Email 
            applicense: this.applicense,                    // App License 
            includeSass: this.includeSass,                  // Sass 
            includeBootstrap: this.includeBootstrap,        // Bootstrap
            includeJQuery: this.includeJQuery,              // JQuery 
            includeModernizr: this.includeModernizr,        // Modernizer 
            includeAnalytics: this.includeAnalytics ,       // Google Analytics 
            includeBabel : this.includeBabel,               // Babel 
            includeRouter : this.includeRouter ,            // Router 
            includeVuex : this.includeVuex ,                // Vuex 
            includeTypeScript : this.includeTypeScript ,    // TypeScript
            includeAxios : this.includeAxios                // Axios 
        };

        // Copy Files Function 
        const copy = (input, output) => {
            this.fs.copy(this.templatePath(input), this.destinationPath(output));
        };
      
        // Copy Files with Data Function [Render]
        const copyTpl = (input, output, data) => {
            this.fs.copyTpl(
              this.templatePath(input),
              this.destinationPath(output),
              data
            );
        };

        // Call Render Files
        config.filesToRender.forEach(file => {
            copyTpl(file.input, file.output, templateContext);
        });
  
        // Call Copy Files
        config.filesToCopy.forEach(file => {
            copy(file.input, file.output);
        });    
    }

    // List Of Questions For User 
    _getPrompts() {
        var prompts = [{
                name: 'name',
                message: 'What is the name of your project?',
                default: this.appname
            }, {
                name: 'description',
                message: 'What is a description of your project'
            }, {
                name: 'version',
                message: 'What version is your project? (hint: use semver like 0.0.0)',
                default: '0.0.0'
            }, {
                name: 'license',
                message: 'How is your project licensed?',
                default: 'MIT'
            }, {
                name: 'author',
                message: 'What is the author name?',
            }, {
                name: 'email',
                message: 'What is the author email?',
            },{
                type: 'checkbox',
                name: 'features',
                message: 'Which additional features would you like to include?',
                choices: [{
                        name: 'Sass',
                        value: 'includeSass',
                        checked: false
                    },
                    {
                        name: 'Bootstrap',
                        value: 'includeBootstrap',
                        checked: true
                    },
                    {
                        name: 'Modernizr',
                        value: 'includeModernizr',
                        checked: false
                    }
                    // ,{
                    //     name: 'GoogleAnalytics',
                    //     value: 'includeAnalytics',
                    //     checked: false
                    // }
                ]
            },
            {
                type: 'confirm',
                name: 'includeJQuery',
                message: 'Would you like to include jQuery?',
                default: true,
                when: answers => !answers.features.includes('includeBootstrap')
            },
            {
                type: 'checkbox',
                name: 'library',
                message: 'Check the features needed for your project:',
                choices: [
                    {
                        name: 'Babel',
                        value: 'includeBabel',
                        checked: true
                    },{
                        name: 'Vuex',
                        value: 'includeVuex',
                        checked: false
                    },
                    {
                        name: 'Router',
                        value: 'includeRouter',
                        checked: false
                    },
                    {
                        name: 'Axios',
                        value: 'includeAxios',
                        checked: false
                    },
                    {
                        name: 'TypeScript',
                        value: 'includeTypeScript',
                        checked: false
                    }
                ]
            },
        ];
        return prompts;
    }

    // Declare User Answers In Vars
    _saveAnswers(answers, callback) {
        // User Info
        this.appname = answers.name; // Name 
        this.appdescription = answers.description; // Description 
        this.appversion = answers.version; // Version 
        this.applicense = answers.license; // Lisence 
        this.appauthor = answers.author; // Author 
        this.appemail = answers.email; // Email 

        // Include Features 
        const features = answers.features;
        const hasFeature = feat => features && features.includes(feat);
        this.includeSass = hasFeature('includeSass');
        this.includeBootstrap = hasFeature('includeBootstrap');
        this.includeModernizr = hasFeature('includeModernizr');
        this.includeAnalytics = hasFeature('includeAnalytics');
        this.includeJQuery = answers.includeJQuery;
        
        // Include Libraries
        const Libraries = answers.library;
        const hasLibraries = lib => Libraries && Libraries.includes(lib);
        this.includeBabel = hasLibraries('includeBabel');
        this.includeVuex = hasLibraries('includeVuex');
        this.includeRouter = hasLibraries('includeRouter');
        this.includeAxios = hasLibraries('includeAxios');
        this.includeTypeScript = hasLibraries('includeTypeScript');

        // Call Back 
        callback(); 
    }

    // Initializing Yeoman
    initializing() {
        // Message 
        var message = chalk.yellow('Welcome To Yo ') + 
                      chalk.magenta.bold.underline(' Venv Generator ') + 
                      chalk.yellow(' First Developed Generator ');
        this.log(yosay(message, {
            maxLength: 17
        })); 
    }

    // Recieve & Save User Answers 
    async prompting() {
        var done = this.async();
        const answers = await this.prompt(this._getPrompts());
        this._saveAnswers(answers, done);
        this.destinationRoot(answers.name);
    }

    // save congigration
    configuring() {
        this.config.save();
    }

    // Writing Process
    writing() {
        this._installNpm();
        this._createDirectors();
        this._createPrjectFileSystem();
    }

    // Install Packages According To User Option 
    installPackages() {
        this.npmInstall();

        // Install Bootstrap And Popper 
        if (this.includeBootstrap) {
            this.npmInstall(['bootstrap', 'popper.js'], { 'save-dev': true });
        }

        // Install JQuery 
        if (this.includeBootstrap || this.includeJQuery) {
            this.npmInstall(['jquery'], { 'save-dev': true });
        }

        // Install Modernizer
        if (this.includeBootstrap || this.includeModernizr) { 
            this.npmInstall(['modernizr'], { 'save-dev': true });
        }  

        // Modernizer 
        if (this.includeModernizr) {
            this.fs.copyTpl(
                this.templatePath('modernizr.json'),
                this.destinationPath('modernizr.json')
            );
        }
    }

    installLibraries () {
        var destRoot = this.destinationRoot() ,
            template = this.sourceRoot(); 

        // Install Babel 
        if (this.includeBabel) {
            this.npmInstall(['babel-eslint'], { 'save-dev': true });       
            this.fs.copy(template + '/babel.config.js' , destRoot +'/babel.config.js');  
            this.log('Babel installed')
        }

        // Install Vuex 
        if (this.includeVuex) {
            this.npmInstall(['vuex'], { 'save-prod': true });
            mkdirp(destRoot + '/src/store');
            if(this.includeTypeScript) {
                this.fs.copy(template + '/store/index.ts' , destRoot +'/src/store/index.ts');
            } else {
                this.fs.copy(template + '/store/index.js' , destRoot +'/src/store/index.js');
            }             
            this.log('vuex installed')
        }

        // Install Vue Router
        if (this.includeRouter) {
            this.npmInstall(['vue-router'], { 'save-prod': true });
            mkdirp(destRoot + '/src/router');
            if(this.includeTypeScript) {
                this.fs.copy(template + '/router/index.ts' , destRoot +'/src/router/index.ts');
            } else {
                this.fs.copy(template + '/router/index.js' , destRoot +'/src/router/index.js');
            }    
            this.log('vue-router installed')
        }

        if(this.includeRouter && this.includeVuex  || this.includeRouter && !this.includeVuex ) {
            mkdirp(destRoot + '/src/views');
            this.fs.copy(template + '/views/Home.vue' , destRoot +'/src/views/Home.vue');
            this.fs.copy(template + '/views/About.vue' , destRoot +'/src/views/About.vue');
        } 

        // Install Axios
        if (this.includeAxios) {
            this.npmInstall(['axios'], { 'save-prod': true });
            this.log('axios installed')
        }

        // Typescript
        if (this.includeTypeScript) {
            var templateContext = {                     
                includeRouter : this.includeRouter ,
                includeVuex : this.includeVuex ,
            };
            this.npmInstall(['vue-class-component','vue-property-decorator'], { 'save-prod': true });
            this.npmInstall(['typescript','@vue/cli-plugin-typescript','ts-loader'], { 'save-dev': true });
            this.fs.copy(template + '/tsconfig.json' , destRoot +'/tsconfig.json');
            this.fs.copy(template + '/shims-tsx.d.ts' , destRoot +'/src/shims-tsx.d.ts');
            this.fs.copy(template + '/shims-vue.d.ts' , destRoot +'/src/shims-vue.d.ts');
            this.fs.copyTpl(template + '/main.ts' , destRoot +'/src/main.ts' , templateContext);
            this.log('Typescript installed')
        }
    }
}
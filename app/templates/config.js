module.exports = {
  filesToCopy: [
    {
      input: '.gitignore',
      output: '.gitignore'
    },
    {
      input: '.editorconfig',
      output: '.editorconfig'
    },
    {
      input: '.jshintrc',
      output: '.jshintrc'
    },
    {
      input: 'logo.png',
      output: 'src/assets/imgs/logo.png'
    },
    {
      input: 'favicon.ico',
      output: 'public/favicon.ico'
    },
    {
      input: '.eslintrc.js',
      output: '.eslintrc.js'
    },
    {
      input: 'jest.config.js',
      output: 'jest.config.js'
    },
    {
      input: 'webpack.config.js',
      output: 'webpack.config.js'
    }
  ],
  filesToRender: [
    {
      input: 'README.md',
      output: 'README.md'
    },
    {
      input: 'package.json',
      output: 'package.json'
    },
    {
      input: 'main.js',
      output: 'src/main.js'
    },
    {
      input: 'index.html',
      output: 'public/index.html'
    },
    {
      input: 'App.vue',
      output: 'src/App.vue'
    },
    {
      input: 'components/HelloWorld.vue',
      output: 'src/components/HelloWorld.vue'
    }
  ]
};
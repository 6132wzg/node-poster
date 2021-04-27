// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
      sourceType: 'module'
    },
    globals: {
      App: false, // 小程序
      getApp: false, // 小程序
      Page: false, // 小程序
      Behavior: false, // 小程序
      wx: false,
      Component: false, // 小程序
      getCurrentPages: false,
      requirePlugin: false, // 小程序
      process: false // 注入环境变量
    },
    env: {
      browser: true
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: 'standard',
    // add your custom rules here
    rules: {
      // allow paren-less arrow functions
      'arrow-parens': 0,
      // allow async-await
      'generator-star-spacing': 0,
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'space-before-function-paren': 0,
      camelcase: 0.
    }
  }

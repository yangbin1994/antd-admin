const path = require('path')
const { version } = require('./package.json')

const branchName = process.env.BRANCH_NAME || process.env.BRANCH_NAME2

export default {
  entry: 'src/index.js',
  theme: "./theme.config.js",
  // proxy: {
  //   "/sword": {
  //     "target": "http://sword.tarsocial.com",
  //     "changeOrigin": true,
  //     "pathRewrite": {
  //       "^/sword": ""
  //     }
  //   },
  // },
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        "transform-decorators-legacy",
        "lodash",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    },
    production: {
      // BRANCH_NAME2 为了在gitlab中可用
      publicPath: branchName ? `http://cdn.tarsocial.com/visual/${branchName.replace(/\./ig, '')}/` : '/',
      extraBabelPlugins: [
        "transform-runtime",
        "transform-decorators-legacy",
        "lodash",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    }
  }
}

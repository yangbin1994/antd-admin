const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = (webpackConfig, env) => {
  const production = env === 'production'
  // FilenameHash
  webpackConfig.output.chunkFilename = '[name].[chunkhash].js'

  if (production) {
    if (webpackConfig.module) {
      // ClassnameHash
      webpackConfig.module.rules.map((item) => {
        if (String(item.test) === '/\\.less$/' || String(item.test) === '/\\.css/') {
          item.use.filter(iitem => iitem.loader === 'css')[0].options.localIdentName = '[hash:base64:5]'
        }
        return item
      })
    }
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      })
    )
  }

  webpackConfig.plugins = webpackConfig.plugins.concat([
    new CopyWebpackPlugin([
      {
        from: 'src/public',
        to: production ? '../' : webpackConfig.output.outputPath,
      },
    ]),
    new HtmlWebpackPlugin({
      development: env === 'development',
      template: `${__dirname}/src/entry.ejs`,
      filename: 'index.html',
      minify: production ? {
        collapseWhitespace: true,
      } : null,
      hash: true,
      headScripts: [
        // '//at.alicdn.com/t/font_400620_8ux5h7ktgdwe9udi.js',
        `${webpackConfig.output.publicPath}iconfont.js`
      ],
      headLinks: [
        // '//at.alicdn.com/t/font_400620_8ux5h7ktgdwe9udi.css',
        `${webpackConfig.output.publicPath}iconfont.css`,
      ]
    }),
  ])

  // custom env
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      '__API_ENV__': JSON.stringify(process.env.API_ENV)
    })
  )

  // Alias
  webpackConfig.resolve.alias = {
    components: `${__dirname}/src/components`,
    utils: `${__dirname}/src/utils`,
    config: `${__dirname}/src/utils/config`,
    enums: `${__dirname}/src/utils/enums`,
    services: `${__dirname}/src/services`,
    models: `${__dirname}/src/models`,
    routes: `${__dirname}/src/routes`,
    themes: `${__dirname}/src/themes`,
  }

  return webpackConfig
}

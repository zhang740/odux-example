const webpack = require('webpack')
const prodConfig = require('./webpack.config')

module.exports = Object.assign(prodConfig, {
    devtool: 'cheap-module-source-map',
    // entry: [
    //     'webpack-dev-server/client?http://localhost:8052',
    //     'webpack/hot/only-dev-server',
    //     './src/app.tsx'
    // ],
    output: Object.assign(prodConfig.output, {
        publicPath: 'http://localhost:8052/'
    }),
    plugins: prodConfig.plugins.concat([
        new webpack.HotModuleReplacementPlugin()
    ]),
})
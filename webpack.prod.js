const webpack = require('webpack')
const prodConfig = require('./webpack.config')

module.exports = Object.assign(prodConfig, {
    plugins: prodConfig.plugins.concat([
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]),
})
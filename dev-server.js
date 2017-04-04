var webpack = require('webpack')
var path = require('path')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.dev')

new WebpackDevServer(webpack(config), {
    contentBase: path.join(process.cwd(), 'dist'),
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
}).listen(8052, function (err) {
    if (err) {
        return console.log(err)
    }

    console.log('Listening at :8052')
});
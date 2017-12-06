const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        app: './src/app.tsx',
        vendors: [
            "classnames",
            "react",
            "react-dom",
            "director",
            "redux",
            // "todomvc-app-css",
            // "todomvc-common"
        ],
    },
    output: {
        path: path.join(__dirname, '/docs'),
        filename: 'assets/js/[name].bundle.js',
        publicPath: './'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
        new CleanWebpackPlugin([path.join(__dirname, '/docs')], {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false
        }),
        new ExtractTextPlugin("assets/css/[name].css"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            chunks: ['vendors', 'app'],
            inject: true,
            minify: {
                removeComments: true,
                // collapseWhitespace: true
            }
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader', 'ts-loader'] //'react-hot-loader', 
            },
            {
                test: /\.scss/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader', 'autoprefixer', 'sass']
            },
            // {
            //     test: /\.css$/,
            //     loaders: ['style-loader', 'css-loader', 'autoprefixer']
            // },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
        ]
    }
}

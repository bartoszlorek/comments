var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'script.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                include: /src/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?modules=true&localIdentName=[hash:base64:5]'
                })
            }
        ],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        })
    ]
}
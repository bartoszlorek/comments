var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/front/index.js',
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
                loader: 'style-loader',
                include: /src/,
            }, {
                test: /\.css$/,
                loader: 'css-loader',
                include: /src/,
                query: {
                    modules: true,
                    localIdentName: '[name]-[local]--[hash:base64:5]'
                }
            }
        ]
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dist'),
        port: 3000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}
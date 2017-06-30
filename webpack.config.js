var webpack = require('webpack');
var path = require('path');

var config = {
    entry: [
        'babel-polyfill',
        './src/index.js',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot-loader', 'babel-loader']
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
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}

if (process.env.NODE_ENV === 'production') {
    config.plugins = [
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
        })
    ]

} else {
    config.devtool = 'cheap-module-source-map';
    config.devServer = {
        historyApiFallback: true
    }
    config.plugins = [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = config;
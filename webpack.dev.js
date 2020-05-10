const path = require('path');
const common = require('./webpack.config');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    devServer: {
        // from which folder dev server needed to read
        contentBase: './dist',
        port: 8080,
        host: 'localhost',
        // for single page application(SPA)
        historyApiFallback: true,
        // reload page only when .js file is changed
        hot: true
    },
    plugins: [
        // use html webpack loader to export index.html
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', //3. Inject styles into DOM
                    'css-loader', //2. Turns css into commonjs
                    'sass-loader' //1. Turns sass into css
                ]
            },
            {
                test: /\.css$/,
                use: [
                    // does not create separate .css file
                    'style-loader',
                    'css-loader',
                ]
            },
        ]
    }
});

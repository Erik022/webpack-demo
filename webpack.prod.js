const path = require('path');
const common = require('./webpack.config');
const merge = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const AssetsWebpackPlugin = require('assets-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contentHash].bundle.js',
        chunkFilename: '[name].[contentHash].chunk.js',
        path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
            new HtmlWebpackPlugin({
                template: './index.html',
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            }),
        ],
        minimize: true,
        // // split all common parts into another file
        splitChunks: {
            chunks: "all",
            name: 'common',
            minSize: 1,
            minChunks: 2
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash:6].css'
        }),
        // clean every time before create bundle files
        new CleanWebpackPlugin(),
        /*
        // connect when you want to generate .html dynamically from back-end
        new AssetsWebpackPlugin({
        filename: 'assets.json',
        path: path.resolve(__dirname, 'dist/json')
        })
        */
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, //3. Extract css into files
                    'css-loader', //2. Turns css into commonjs
                    'sass-loader' //1. Turns sass into css
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
        ]
    }
});

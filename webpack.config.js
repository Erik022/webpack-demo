const path = require('path')
const webpack = require('webpack')

module.exports = {
    // default folder path
    context: path.resolve(__dirname, 'src'),
    // application start file *.js
    entry: {
        polyfill: 'babel-polyfill',
        index: './index'
    },
    output: {
        // in which folder create bundle
        path: path.resolve(__dirname, 'dist'),
        // for create global variable
        library: '[name]'
    },
    plugins: [
        // we can to not  import lodash/map everywhere in the project, just define here
        new webpack.ProvidePlugin({
            map: 'lodash/map'
        })
    ],
    module: {
        rules: [
            {
                //file extension
                test: /\.js?$/,
                // except node_modules
                // exclude: /node_modules/,
                // we can use or exclude or include
                include: path.resolve(__dirname, 'src'),
                //use loader
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            // {
            //     test: /\.bundle\.js$/,
            //     use: {
            //         loader: 'bundle-loader',
            //         options: {
            //             lazy: true
            //         }
            //     }
            // },
            {
                test: /\.(svg|png|jpg|gif|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name][contentHash:6].[ext]",
                        outputPath: "assets"
                    }
                }
            },
            {
                //we can use exports loader to export functions and variables from old files
                test: /work.js$/,
                //we can also use imports-loader to import variables into .js file
                //example imports=loader?$=jquery ,...
                use: 'exports-loader?startWork,finishWork'
            }
        ],
        //here we can write regex path to directory which we do not want to scan, just include
        // ignore all require from mentioned file
        noParse: /jquery/
    },
    externals: {
        //here we can write module name and name of global variable
        //   lodash: '_' for example lodash
        //   pluck:
    },
    // watch: true,
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        alias: {
            // instead of usind ../../../ in .js files we can declare alias and use in our files
            //ex. import * as old from 'old';
            old: path.resolve(__dirname, 'src/vendor/old/work'),
        },
        extensions: ['.js', '.jsx', '.css', '.png', '.jpg', '.gif', '.jpeg'],
    },

    // to be to view source map
    devtool: 'source-map'
}

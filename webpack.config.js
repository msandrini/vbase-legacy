const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const WebpackMd5Hash = require('webpack-md5-hash');

//const isProduction = () => (process.env.NODE_ENV && process.env.NODE_ENV === 'production');
const appPath = (subPath) => path.resolve(__dirname, `app/${subPath}`);

const basicConfig = {
    entry: {
        app: appPath('index.jsx'),
        vendor: [
            'axios',
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'redux-saga',
            'react-router',
            'react-router-redux'
        ],
    },
    output: {
        path: appPath('_bundled/'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            enforce: 'pre',
            exclude: [/mode_modules/],
            loader: 'eslint-loader',
            options: {
                emitWarning: true,
            },
        }, {
            test: /\.jsx?$/,
            include: /app\//,
            loader: "babel-loader",
            options: {
                presets: ['latest', 'react'],
                plugins: ['transform-runtime'],
                cacheDirectory: appPath('_cache/babelloader/')
            }
        }, {
            test: /\.css$/,
            exclude: [/mode_modules/, /server/],
            use: ExtractTextPlugin.extract({
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            })
        }, {
            test: /\.styl$/,
            use: [
                'style-loader',
                'css-loader', {
                    loader: 'stylus-loader'
                },
            ],
        }, {
            test: /\.json$/,
            use: 'json-loader'
        }, {
            test: /\.svg$/,
            loader: 'svg-url-loader'
        }]
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle.css',
            disable: false,
            allChunks: true
        }),
        //new WebpackMd5Hash(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: Infinity
        })
    ]
};

module.exports = basicConfig;

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('webpack-uglify-js-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const isProduction = () => (process.env.DEPLOY_ENV && process.env.DEPLOY_ENV === 'production');
const appPath = (subPath) => path.resolve(__dirname, `app/${subPath}`);

const basicConfig = {
    entry: {
        app: appPath('index.jsx'),
        vendor: [
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

if (isProduction()) {
    basicConfig.module.rules[0].use.push("UglifyJsPlugin");
    basicConfig.plugins.push(new UglifyJsPlugin({
        sourceMap: true,
        cacheFolder: appPath('_cache/uglifyjs/'),
        compress: { warnings: true }
    }));
}

module.exports = basicConfig;


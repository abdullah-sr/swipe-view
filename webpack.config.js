const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VERSION = require('./package.json').version;

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const APP_ENV = process.env.app ? process.env.app : 'swipe';

const BUILD_DIR = path.resolve(__dirname, './dist');
const APP_DIR = path.resolve(__dirname, `./src/${APP_ENV}`);
const OUTPUT = NODE_ENV === 'development' ? `${BUILD_DIR}/${NODE_ENV}/${APP_ENV}` : `${BUILD_DIR}/${NODE_ENV}/${VERSION}/${APP_ENV}`;

const config = {
    entry: `${APP_DIR}/main.jsx`,
    output: {
        path: OUTPUT,
        filename: 'app.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: APP_DIR,
                use: 'babel-loader',
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${APP_DIR}/index.html`,
            hash: true,
        }),
        new UglifyJsPlugin(),
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
        }),
    ],
};

module.exports = config;

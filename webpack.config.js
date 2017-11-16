const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './dist');
const APP_DIR = path.resolve(__dirname, './');

const config = {
    entry: `${APP_DIR}/main.js`,
    output: {
        path: BUILD_DIR,
        filename: "app.js"
    },
    module: {
        rules: [
            {test: /\.js$/, include: APP_DIR, use: "babel-loader"},
        ]
    }
};

module.exports = config;
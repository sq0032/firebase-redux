var webpack = require('webpack');
//var path = require('path');

module.exports = {
    entry: [
        "webpack-dev-server/client?http://0.0.0.0:3000",
        "webpack/hot/only-dev-server",
        "./app/js/index.js"
    ],
    output: {
        path: __dirname,
        filename: "./public/bundle.js"
    },
//    resolve: {
//        root: path.resolve('./'),
//        alias: {
//          'js': "js",
//        }
//    },
    module:{
        loaders:[
            { test: /\.css$/, loader: "style!css"},
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'react-hot'
            },
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel', // 'babel-loader' is also a legal name to reference
              query: {
                plugins: ['transform-decorators-legacy' ],
                presets: ['react', 'es2015', 'stage-0']
              }
            }
        ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
}
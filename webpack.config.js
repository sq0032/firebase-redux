module.exports = {
    entry: [
        "./app/js/index.js"
    ],
    output: {
        path: __dirname,
        filename: "./public/bundle.js"
    },
    module:{
        loaders:[
            { test: /\.css$/, loader: "style!css"},
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel', // 'babel-loader' is also a legal name to reference
              query: {
                presets: ['react', 'es2015', 'stage-0']
              }
            }
        ]
    }
}
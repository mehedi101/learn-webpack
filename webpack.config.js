const path = require('path');

module.exports = {
    mode: 'development',
    entry : './app/app.js',
    output : {
        filename : 'mybundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer : {
        port : 8080,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,

    },
    module : {
        rules : [
                    {
                        test: /\.scss$/,
                        use:['style-loader', 'css-loader','sass-loader']
                    },
                    {
                        test : /\.js/,
                        exclude : /(node_modules|bower_components)/,
                        use:{
                            loader: 'babel-loader',
                            options : {
                                presets: ['@babel/preset-env','@babel/preset-react']
                            }
                        }
                        
                    }
        ]
    }
}
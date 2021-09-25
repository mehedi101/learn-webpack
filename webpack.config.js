const currentTask = process.env.npm_lifecycle_event;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const path = require('path');
const config = {
    mode: 'development',
    entry : './app/app.js',
    devtool: 'inline-source-map',
    output : {
        clean : true,
        filename : 'mybundle.[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer : {
        port : 8080,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,

    },
    plugins : [new HtmlWebpackPlugin({template:'./app/index.html'})],
    module : {
        rules : [
                    {
                        test: /\.scss$/i,
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

if( currentTask == 'build' || currentTask == 'watch'){
    config.mode = 'production';
    config.module.rules[0].use[0] = MiniCssExtractPlugin.loader;

    config.plugins.push(
        new MiniCssExtractPlugin({filename: "main.[hash].css"}), 
        new WebpackManifestPlugin()
    )
}
module.exports = config;
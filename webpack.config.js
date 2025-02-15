const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', // Ou 'production' para produção
    entry: './src/App.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // Pasta de saída
        publicPath: '/gg2-system/dist/', // URL pública dos arquivos (importante!)
    },
    devServer: {
        static: './dist', // Pasta dos arquivos estáticos
        hot: true, // Habilita o Hot Module Replacement (HMR)
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};
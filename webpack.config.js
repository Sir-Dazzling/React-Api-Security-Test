import HtmlWebpackPlugin from 'html-webpack-plugin';

export const mode = 'development';
export const resolve = {
    extensions: ['.js', '.jsx'],
};
export const module = {
    rules: [
        {
            test: /\.jsx?$/,
            loader: 'babel-loader'
        }
    ]
};
export const plugins = [new HtmlWebpackPlugin({
    template: './src/index.html'
})];
export const devServer = {
    historyApiFallback: true
};
export const externals = {
    // global app config object
    config: JSON.stringify({
        apiUrl: 'http://localhost:4000'
    })
};

export const nodeExternals = require('webpack-node-externals');
module.exports = {
  externals: [nodeExternals()]
}
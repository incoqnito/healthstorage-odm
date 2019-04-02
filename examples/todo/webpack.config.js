const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  context: path.resolve(process.cwd(), './src'),
  entry: './index.js',
  output: {
    path: path.resolve(process.cwd(), './dist'),
    filename: '[name].[hash:8].js'
  },
  devtool: 'source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html'
    })
  ],
  devServer: {
    compress: true,
    clientLogLevel: 'none',
    contentBase: './lib',
    overlay: true,
    hot: false,
    quiet: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/
    }
  }
}

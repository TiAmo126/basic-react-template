const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { PROJECT_PATH, isDev } = require('../constants')

module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, './src/app.js'),
  },
  output: {
    filename: `[name]${isDev ? '' : '.[hash:8]'}.js`,
    path: path.resolve(PROJECT_PATH, './dist'),
    clean: true, // 打包自动清理dist目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
    }),
  ],
  resolve: {
    // 添加这些后缀名作为解析，引入时可不用添加后缀（优先级按照数组顺序）
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
}

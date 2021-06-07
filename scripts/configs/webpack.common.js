const path = require('path')
const { PROJECT_PATH } = require('../constants')

module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, './src/app.js'),
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(PROJECT_PATH, './dist'),
  },
  resolve: {
    // 添加这些后缀名作为解析，引入时可不用添加后缀（优先级按照数组顺序）
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
}

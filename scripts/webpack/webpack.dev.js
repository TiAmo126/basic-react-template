const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    compress: true, // 是否启用gzip压缩
    clientLogLevel: 'silent',
    stats: 'errors-only', // 终端只打印error
    open: true, // 编译完成自动打开浏览器
    port: 3002,
  },
})

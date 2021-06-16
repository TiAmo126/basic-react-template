// webpack公共配置文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { PROJECT_PATH, isDev } = require('../constants')

// 针对不同的样式文件引用不同的loader，因为大部分相同，所以抽成公共方法
function getCssLoader(lang) {
  const loaders = [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDev,
        importLoaders: lang === 'css' ? 0 : 1,
      },
    },
  ]
  if (lang === 'less') {
    loaders.push({
      loader: 'less-loader',
      options: {
        lessOptions: {
          sourceMap: isDev,
        },
      },
    })
  }
  return loaders
}

module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, './src/app.ts'),
  },
  output: {
    filename: `[name]${isDev ? '' : '.[hash:8]'}.js`,
    path: path.resolve(PROJECT_PATH, './dist'),
    clean: true, // 打包自动清理dist目录
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getCssLoader('css'),
      },
      {
        test: /\.less$/,
        use: getCssLoader('less'),
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
    }),
  ],
  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve(PROJECT_PATH, './src'),
    },
    // 添加这些后缀名作为解析，引入时可不用添加后缀（优先级按照数组顺序）
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
}

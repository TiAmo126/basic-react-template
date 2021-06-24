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
        importLoaders: lang === 'css' ? 1 : 2,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                grid: true,
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            require('postcss-normalize'),
          ],
        },
        sourceMap: isDev,
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
  target: isDev ? 'web' : 'browserslist',
  entry: {
    app: path.resolve(PROJECT_PATH, './src/index.tsx'),
  },
  output: {
    filename: `[name]${isDev ? '' : '.[contenthash]'}.js`,
    path: path.resolve(PROJECT_PATH, './dist'),
    clean: true, // 打包自动清理dist目录
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
        use: [],
      },
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: getCssLoader('css'),
      },
      {
        test: /\.less$/,
        use: getCssLoader('less'),
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[hash:8].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 当文件小于10kb的时候采用url-loader将图片打包成base64的格式（否则就用file-loader）
              limit: 10 * 1024,
              name: '[name].[hash:8].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '基础模板',
      template: path.resolve(PROJECT_PATH, './public/index.html'),
      favicon: path.resolve(PROJECT_PATH, './public/favicon.ico'),
    }),
  ],
  resolve: {
    // 路径别名
    alias: {
      '@': path.resolve(PROJECT_PATH, './src'),
    },
    // 添加这些后缀名作为解析，引入时可不用添加后缀（优先级按照数组顺序）
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
}

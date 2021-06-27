// webpack公共配置文件
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { srcDir, isDev, entryPath, buildPath, templatePath, faviconPath } = require('../constants')

// 针对不同的样式文件引用不同的loader，因为大部分相同，所以抽成公共方法
function getCssLoader(lang) {
  const loaders = [
    'style-loader',
    {
      loader: require.resolve('@opd/css-modules-typings-loader'),
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDev,
        importLoaders: lang === 'css' ? 1 : 2,
        modules: {
          // 在本地环境下为了方便调试，我们将样式名展示为路径拼接类名
          localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64]',
          // 将本地环境的命名转换为驼峰格式
          exportLocalsConvention: 'camelCaseOnly',
          auto: true,
        },
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
  target: isDev ? 'web' : 'browserslist', // webpack-dev-server热更新与browserslist环境冲突
  entry: {
    app: entryPath,
  },
  output: {
    filename: `[name]${isDev ? '' : '.[contenthash]'}.js`,
    path: buildPath,
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
            include: srcDir,
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
      template: templatePath,
      favicon: faviconPath,
    }),
    new WebpackBar(), // 显示编译进度
    new webpack.IgnorePlugin({
      // 忽略样式类型文件的编译
      resourceRegExp: /(css|less)\.d\.ts$/,
    }),
    new ForkTsCheckerWebpackPlugin({
      // 打包时对文件进行类型检测
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}',
      },
    }),
  ],
  resolve: {
    // 路径别名
    alias: {
      '@': srcDir,
    },
    // 添加这些后缀名作为解析，引入时可不用添加后缀（优先级按照数组顺序）
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
}

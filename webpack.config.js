// module.exports = {
//   entry: './src/index.tsx',
//   output: {
//     filename: 'bundle.js',
//     path: `${__dirname}/dist`,
//   },
//   mode: 'development',

//   // 启用source-map调试webpack的输出
//   devtool: 'source-map',

//   resolve: {
//     // 添加这些后缀名作为解析，引入时可不用添加后缀（优先级按照数组顺序）
//     extensions: ['.ts', '.tsx', '.js', '.json'],
//   },
//   module: {
//     // 指定对应后缀的文件用什么loader来处理
//     rules: [
//       { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
//       {
//         enforce: 'pre',
//         test: /\.js$/,
//         loader: 'source-map-loader',
//       },
//     ],
//   },
//   externals: {
//     react: 'React',
//     'react-dom': 'ReactDOM',
//   },
// }

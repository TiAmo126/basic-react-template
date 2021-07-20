# basic-react-template

> 项目地址：https://github.com/TiAmo126/basic-react-template

#### 1. 初始化 node 项目

```javascript
npm init -y
```

初始化项目，生成 `package.json` 文件

#### 2. 使项目不受开发者自己的 **`vscode`** 配置干扰

配置 `vscode` 配置文件，该配置优先于全局配置

根目录下创建如下文件，即 `vscode` 配置，优先级高于本地默认配置

```properties
// 根目录
.vscode/
    settings.json
```

- 我的配置：[代码地址](https://github.com/TiAmo126/basic-react-template/blob/main/.vscode/settings.json)

```json
{
  ...
  "search.exclude": {// 指定哪些文件不参与搜索
    "**/node_modules": true,
    "**/bower_components": true,
    "**/*.code-search": true
  },
  "typescript.tsdk": "./node_modules/typescript/lib",  // 代替 vscode 的 ts 语法智能提示，需安装ts依赖
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,   // 自动修复eslint错误代码
    "source.fixAll.stylelint": true	// 使用stylelint修复样式代码
  },
  "editor.formatOnSave": true,  // 保存时自动格式化代码
  "[javascript]": {// 针对某种语言，配置格式化工具
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

#### 3. EditorConfig - 统一编辑器风格，控制缩进等

安装 `Editorconfig` 插件，配置 `.editorconfig` 文件，安装 `vscode` 插件

- 我的配置：

  ```javascript
  {
  	root = true
  	[*]
  	# 去除多余空格
  	trim_trailing_whitespace = true
  	# 在尾部插入一行
  	insert_final_newline = true
  	# 换行符
  	end_of_line = lf
  	[*.md]
  	trim_trailing_whitespace = false
  }
  ```

#### 4. Prettier - 统一项目风格，与 `editorconfig` 类似，可以通过配置在保存时自动修复代码格式

```javascript
npm i prettier -D
```

安装 `prettier` ，配置 `.prettierrc` 文件，安装 `vscode` 插件

- 我的配置：

```javascript
{
  // 句尾添加分号
  "semi": false,
  // 使用单引号替代双引号
  "singleQuote": true,
  // 在对象或数组最后一个元素后面是否加逗号（在 ES5 中加尾逗号）
  "trailingComma": "es5",
  // 单行最大长度，超出换行
  "printWidth": 100,
  // 对象变量前后输出空格
  "bracketSpacing": true
}
```

#### 5. Eslint - 统一代码规范，提升代码质量，可以通过配置在保存时自动修复代码格式

```javascript
npm i eslint -D

npx eslint --init
```

安装 `eslint` 依赖，并初始化配置文件，安装 `vscode` 插件

`eslint` 的配置就是仁者见仁，智者见智了，每个人的规则习惯都不一样，建议跟着官网的指引配置，然后在实践的过程中优化完善，[eslint 中文官网地址](https://eslint.bootcss.com/)，[我的配置参考](https://github.com/TiAmo126/basic-react-template/blob/main/.eslintrc.js)

#### 6. Stylelint - 统一样式代码规范

```javascript
npm i stylelint stylelint-config-standard -D
```

安装 `stylelint` 依赖以及官方规则依赖，安装 `vscode` 插件

- 我的配置：

```javascript
module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'comment-empty-line-before': null, // 要求或禁止在注释之前的空行
    'declaration-empty-line-before': null, // 要求或禁止在声明之前的空行
    'function-name-case': 'lower', // 指定函数名的大小写 lower-小写
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'no-invalid-double-slash-comments': null, //禁止 CSS 不支持并可能导致意外结果的双斜杠注释
    'rule-empty-line-before': 'always', // 要求或禁止在规则之前的空行
  },
  ignoreFiles: ['node_modules/**/*', 'build/**/*'], // 忽略哪些文件
}
```

#### 6. husky && commitlint - 提交代码前，校验一次代码规则，并规范提交信息

```javascript
npm i husky lint-staged -D
npm install @commitlint/cli @commitlint/config-conventional -D
```

`lint-staged` 指定校验规则，`husky` 提供钩子，比如在执行提交前使用 `lint-staged` 检测缓存区的代码格式

该项目中配置了也是最常用的两个钩子

```javascript
npx husky-init // 初始化 husky
npx husky add .husky/pre-commit "npx lint-staged && npx tsc --noEmit" // 提交前的代码检测以及自动修复
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"' // 提交信息规范检测
```

`package.json` 新增

```json
"scripts": {
  // ...
  "lint": "npm run lint-eslint && npm run lint-stylelint",
  "lint-eslint": "eslint . --ext=.js,.jsx,.ts,.tsx --fix",
  "lint-stylelint": "stylelint ./src/**/*.{less,css} --fix",
  // ...
}
// ...
"lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix"
  ],
  "*.{css,less}": [
    "stylelint --fix"
  ],
  "*.{json,md}": [
    "prettier --write"
  ]
}
```

#### 7. conventional-changelog-cli - 根据规范的提交信息自动生成 CHNAGELOG

```javascript
npm i conventional-changelog-cli -D
```

覆盖原有 `changelog` 内容，重新生成所有日志： **_conventional-changelog -p angular -i CHANGELOG.md -s -r 0_**

在现有的日志之上添加新的记录：**_conventional-changelog -p angular -i CHANGELOG.md -s_**

添加为脚本命令：

```json
"scripts": {
  // ...
  "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
  // ...
}
```

#### 8. webpack - 项目打包工具

[配置参考](https://github.com/TiAmo126/basic-react-template/blob/main/scripts/webpack/webpack.common.js)

```javascript
npm install webpack webpack-cli -D
```

然后可以参考我的项目创建目录，

```properties
// 根目录
.scripts/
		webpack/
				webpack.common.js //公共配置
				webpack.dev.js //开发环境配置
				webpack.prod.js	//生产环境配置
    constants.js
```

##### 8.1 区分开发环境正式环境，在开发环境下配置服务器打开，正式环境打包压缩代码

需要安装的依赖

```javascript
webpack-merge: 写一套基础配置，通过 merge 依赖合并到不同环境下
webpack-dev-server: 本地启一个服务，达到预览页面的效果
html-webpack-plugin： 将打包后的文件自动引入 html 文件中
```

**webpack.common.js**

```javascript
// ...

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
  // ...
}
```

**webpack.dev.js**

```javascript
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
```

##### 8.2 loader 配置

需要安装的依赖

```javascript
样式资源文件 loader 及相关依赖
style-loader: 生成一个 style 标签将 js 中的 css 样式字符串放进去，然后插入到 html 中生效

css-loader: 将 css 文件解析为字符串写入到 js 文件中

less
less-loader: 将 less 文件编译解析为 css 文件

ts-loader: 编译 ts 文件

postcss-loader: 使用 PostCSS 加载并转换 CSS 文件,使写出来的 css 兼容更多浏览器
postcss-flexbugs-fixes: 用于修复一些和 flex 布局相关的 bug。
postcss-preset-env: 将最新的 CSS 语法转换为目标环境的浏览器能够理解的 CSS 语法，目的是使开发者不用考虑浏览器兼容问题
autoprefixer: 自动添加浏览器头
postcss-normalize: 从 browserslist 中自动导入所需要的 normalize.css 内容。

browserslist: 配置对浏览器的支持条件

url-loader: 在文件大小低于指定限制的时候将其打包成 base64URL 的格式

file-loader: 将一个文件中的 import/require() 解析为 url，并且将文件发送到输出文件夹。

解析 jsx 语法依赖
"babel-loader":允许使用 babel 和 webpack 转译 tsx 文件
"@babel/core":babel 核心包，使用 babel-loader 必须安装
"@babel/preset-env":根据设置的浏览器环境找出所需的插件转译 ES6 语法
"@babel/preset-react": 编译 react 文件，记得将 runtime 配置设置为 automatic，这样才会自动导入 JSX 转换而来的函数
"@babel/preset-typescript": 编译 ts
"@babel/plugin-transform-runtime": 类似@babel/preset-env
```

**webpack.common.js**

```javascript
// ...

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
  // ...
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
  // ...
}
```

根目录创建 `.babelrc` 文件，代码如下

.**babelrc**

```javascript
{
  "presets": [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ],
    "@babel/preset-typescript"
  ],
  "plugins": [["@babel/plugin-transform-runtime", { "useEsModules": true }]]
}

```

##### 8.3 配置优化和相关问题

- 项目打包 `favicon` 图标，并在打包后的 `index.html` 文件中自动引入 `favicon`

  在 `htmlWebpackPlugin` 配置中添加如下代码

  ```javascript
  new HtmlWebpackPlugin({
     title: '基础模板',
     template: templatePath,
     favicon: 你的favicon文件路径,
  }),
  ```

- 使用 `css module` ，会在类名上自动添加 `hash` 字符串，可以有效避免同名样式冲突

  为了方便我们引用 `less` 样式，我们安装一个依赖使 `less` 文件自动生成 `d.ts` 文件

  ```javascript
  1. 安装 @opd/css-modules-typings-loader或者@teamsupercell/typings-for-css-modules-loader 依赖，用于通过 less 文件自动生成 d.ts 文件

  // webpack.common.js
  // ...
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
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
          // ... 其他loader
        ],
      },
    ]
  }
  // ...
  ```

- 编译显示进度

  ```javascript
  安装 WebpackBar 依赖

  在 webpack.common.js 的 plugins 中添加
  new WebpackBar(), // 显示编译进度
  ```

- 在生产环境编译完成的时候查看包大小和依赖关系

  ```javascript
  安装 webpack-bundle-analyzer 依赖

  在 webpack.prod.js 的 plugins 中添加
  new BundleAnalyzerPlugin() // 查看包的依赖图以及大小
  ```

- 生产环境打包编译时也要进行 `ts` 类型检测

  ```javascript
  安装 fork-ts-checker-webpack-plugin 依赖

  在 webpack.common.js 的 plugins 中添加
  new ForkTsCheckerWebpackPlugin({
    // 打包时对文件进行类型检测
    eslint: {
      files: './src/**/*.{ts,tsx,js,jsx}',
    },
  }),
  ```

- 正式环境下打包将 `css` 文件从 `js` 中抽离出来

  ```javascript
  安装 mini-css-extract-plugin 依赖

  在 webpack.common.js 的 plugins 中添加
  new MiniCssExtractPlugin({
    // 将分离开的css文件输出到dist/css下
    filename: 'css/[name].[contenthash].css',
  }),
  还要记得将 style-loader 一下,因为 MiniCssExtractPlugin.loader 做的事情就是提取 js 中的 css 成单独文件
  [ isDev ? 'style-loader' : MiniCssExtractPlugin.loader ]
  ```

- 压缩 `css` 代码

  ```javascript
  安装 css-minimizer-webpack-plugin 依赖

  在 webpack.common.js 中添加
  optimization: {
    minimize: !isDev,
    minimizer: [new CssMinimizerPlugin()],
  },
  意味着根据不同的环境采取不同的优化，这里意为当不是 development 环境时使用插件压缩 css 代码
  ```

- 热更新不生效

  原因：因为热更新不支持 `browserslist`

  解决方案：在 `webpack.common.js` 文件中声明 `target`

  ```javascript
  target: isDev ? 'web' : 'browserslist'
  ```

- `ts` 当中引入文件资源会报错

  解决方案：src 目录下创建一个 d.ts 文件，名字随意，给资源文件声明类型

  ```typescript
  declare module '*.bmp' {
    const src: string
    export default src
  }

  declare module '*.gif' {
    const src: string
    export default src
  }

  declare module '*.jpg' {
    const src: string
    export default src
  }

  declare module '*.jpeg' {
    const src: string
    export default src
  }

  declare module '*.png' {
    const src: string
    export default src
  }
  ```

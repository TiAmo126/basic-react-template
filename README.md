# basic-react-template

This is a basic react template

## 1. 构建过程

#### **1. 初始化 node 项目**

```javascript
npm init -y
```

初始化项目，生成 package.json 文件

#### **2. 使项目不受开发者自己的 `vscode` 配置干扰**

配置 vscode 配置文件，该配置优先于全局配置

根目录下创建如下文件，即 vscode 配置，优先级高于本地默认配置![image-20210519103442541](https://chanceyliu-1301861058.cos.ap-chongqing.myqcloud.com/markdown/image-20210519103442541.png)

- 我的配置：

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

#### **3. EditorConfig - 统一编辑器风格，控制缩进等**

安装 `Editorconfig` 插件，配置 .editorconfig 文件，安装 vscode 插件

- 我的配置：

  ```javascript
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
  ```

#### **4. Prettier - 统一项目风格，与 `editorconfig` 类似，可以通过配置在保存时自动修复代码格式**

```javascript
npm i prettier -D
```

安装 `prettier` ，配置 .prettierrc 文件，安装 vscode 插件

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

#### **5. Eslint - 统一代码规范，提升代码质量，可以通过配置在保存时自动修复代码格式**

```javascript
npm i eslint -D
npx eslint --init
```

安装 `eslint` 依赖，并初始化配置文件，安装 vscode 插件

[eslint 中文官网地址](https://eslint.bootcss.com/)

#### **5. Stylelint - 统一样式代码规范**

```javascript
npm i stylelint stylelint-config-standard -D
```

安装 `stylelint` 依赖以及官方规则依赖，安装 vscode 插件

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

#### **6. husky&&**commitlint - 提交代码前，校验一次代码规则，并规范提交信息

```javascript
npm i husky lint-staged -D
```

`lint-staged` 指定校验规则，`husky` 提供钩子，比如在执行提交前使用 `lint-staged` 检测代码格式

该项目中配置了也是最常用的两个钩子

```javascript
npx husky-init // 初始化 husky
npx husky add .husky/pre-commit "npx lint-staged && npx tsc --noEmit" // 提交前的代码检测以及自动修复
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"' // 提交信息规范检测
```

package.json 新增

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

#### 7. **conventional-changelog-cli - 根据规范的提交信息自动生成 CHNAGELOG**

```javascript
npm i conventional-changelog-cli -D
```

覆盖原有 changelog 内容，重新生成所有日志：conventional-changelog -p angular -i CHANGELOG.md -s -r 0

在现有的日志之上添加新的记录：conventional-changelog -p angular -i CHANGELOG.md -s

添加为脚本命令：

```json
"scripts": {
  // ...
  "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
  // ...
}
```

#### 8. webpack - 项目打包工具

> 待补充

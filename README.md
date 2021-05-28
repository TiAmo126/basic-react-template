# basic-react-template

This is a basic react template

## 构建过程

1. > npm init -y

   初始化项目，生成 package.json 文件

## 依赖说明

### prettier

> "semi": false // 句尾添加分号
>
> "singleQuote": true // 使用单引号替代双引号
>
> "trailingComma": "es5" // 在对象或数组最后一个元素后面是否加逗号（在 ES5 中加尾逗号）

### 简稿，待优化

#### husky && commitlint

初始化：npx husky-init
代码检测：npx husky add .husky/pre-commit "npx lint-staged && npx tsc --noEmit"
提交信息检测：npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'

#### conventional-changelog-cli

根据提交信息自动生成 changelog 文件

覆盖原有 changelog 内容，重新生成所有日志：conventional-changelog -p angular -i CHANGELOG.md -s -r 0
在现有的日志之上添加新的记录：conventional-changelog -p angular -i CHANGELOG.md -s

#### webpack 配置

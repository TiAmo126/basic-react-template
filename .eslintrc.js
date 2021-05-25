const OFF = 0 // "off" 或 0 关闭规则
const WARN = 1 // "warn" 或 1 开启规则-警告级别
const ERROR = 2 // "error" 或 2 关闭规则-错误级别

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // 继承配置，eslint-config关键字可以省略
  // 规则优先级从低到高，后面的配置可以覆盖起那面的配置
  // :recommended意为启用该继承项中最核心的规则
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  // 指定依赖作为解析器：@typescript-eslint/parser - 将 TypeScript 转换成与 estree 兼容的形式，以便在ESLint中使用。
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      // 全局启用严格模式
      impliedStrict: true,
      jsx: true,
    },
    // 支持什么版本的es语法
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'unicorn', 'promise', '@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
      },
      typescript: {},
    },
  },
  rules: {
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
    'import/prefer-default-export': OFF,
    'import/no-unresolved': ERROR,
    'import/no-dynamic-require': OFF,

    'unicorn/better-regex': ERROR,
    'unicorn/prevent-abbreviations': OFF,
    'unicorn/filename-case': [
      ERROR,
      {
        cases: {
          // 中划线
          kebabCase: true,
          // 小驼峰
          camelCase: true,
          // 下划线
          snakeCase: false,
          // 大驼峰
          pascalCase: true,
        },
      },
    ],
    'unicorn/no-array-instanceof': WARN,
    'unicorn/no-for-loop': WARN,
    'unicorn/prefer-add-event-listener': [
      ERROR,
      {
        excludedPackages: ['koa', 'sax'],
      },
    ],
    'unicorn/prefer-query-selector': ERROR,
    'unicorn/no-null': OFF,
    'unicorn/no-array-reduce': OFF,

    '@typescript-eslint/no-useless-constructor': ERROR,
    '@typescript-eslint/no-empty-function': WARN,
    '@typescript-eslint/no-var-requires': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/no-use-before-define': ERROR,
    '@typescript-eslint/no-unused-vars': WARN,
    'no-unused-vars': OFF,

    'react/jsx-filename-extension': [ERROR, { extensions: ['.tsx', 'ts', '.jsx', 'js'] }],
    'react/jsx-indent-props': [ERROR, 2],
    'react/jsx-indent': [ERROR, 2],
    'react/jsx-one-expression-per-line': OFF,
    'react/destructuring-assignment': OFF,
    'react/state-in-constructor': OFF,
    'react/jsx-props-no-spreading': OFF,
    'react/prop-types': OFF,
    // 关闭tsx文件中必须引入react
    'react/react-in-jsx-scope': OFF,

    'jsx-a11y/click-events-have-key-events': OFF,
    'jsx-a11y/no-noninteractive-element-interactions': OFF,
    'jsx-a11y/no-static-element-interactions': OFF,

    'lines-between-class-members': [ERROR, 'always'],
    'linebreak-style': [ERROR, 'unix'],
    'no-unused-expressions': WARN,
    'no-plusplus': OFF,
    'class-methods-use-this': ERROR,
    'jsx-quotes': [ERROR, 'prefer-single'],
    'global-require': OFF,
    'no-use-before-define': OFF,
    'no-restricted-syntax': OFF,
    'no-continue': OFF,
    // 不允许出现console
    'no-console': OFF,
    // 箭头函数定义至最顶层
    'unicorn/consistent-function-scoping': OFF,
    // 未添加useEffect依赖项时警告
    'react-hooks/exhaustive-deps': WARN,
  },
  // 为特定文件制定规则
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'unicorn/prefer-module': OFF,
      },
    },
  ],
}

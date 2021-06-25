const path = require('path')

const PROJECT_PATH = path.resolve(__dirname, '../')
const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  isDev,
  PROJECT_PATH,
}

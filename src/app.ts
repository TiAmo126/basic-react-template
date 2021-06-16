// import styles from './app.less'

const root = document.querySelector('#root')
const link = document.createElement('link')
link.rel = 'stylesheet'
// link.href = styles
document.querySelectorAll('head')[0].append(link)

if (root) {
  root.innerHTML = '奥利给!!'
}

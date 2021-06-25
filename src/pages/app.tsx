import { FC } from 'react'
import styles from './app.module.less'
import Test from './test'

const App: FC = () => {
  return (
    <div className={styles.root}>
      <Test />
      <ul className={styles.rootBig}>
        <li>1222####221</li>
        <li>1222####221</li>
        <li>122s%%ss1</li>
        <li>122s%%ss1</li>
        <li>2222</li>
      </ul>
    </div>
  )
}

export default App

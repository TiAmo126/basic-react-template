import { FC } from 'react'
import styles from './app.module.less'
import Test from './test'

const App: FC = () => {
  return (
    <div className={styles.root}>
      <Test name="lxy" age={18} />
    </div>
  )
}

export default App

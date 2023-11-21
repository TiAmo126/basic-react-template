import {
  FC,
  // useEffect, useState
} from 'react'
import styles from './app.module.less'

const App: FC = () => {
  // const [str, setStr] = useState(false)

  // useEffect(() => {
  //   if (str) {
  //     console.log('999')
  //   }
  // }, [])

  return (
    <div className={styles.page}>
      <h1>基础模板</h1>
    </div>
  )
}

export default App

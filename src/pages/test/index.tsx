import { printMy } from '@/utils'
import { FC } from 'react'
import styles from './index.module.less'

interface IProps {
  name: string
  age: number
}

const Test: FC<IProps> = (props) => {
  const { name, age } = props
  return (
    <div className={styles.testSmall}>
      {printMy}
      {name}
      <span>{age}</span>
    </div>
  )
}

export default Test

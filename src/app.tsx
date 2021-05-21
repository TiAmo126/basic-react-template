import { FC, useEffect, useState } from 'react'
import { Test } from './config/constants'

const App: FC = () => {
  const [test, setTest] = useState<string>()

  useEffect(() => {
    setTest('xx')
    console.log(test)
  }, [test])

  // const MAX = 9
  const MIN = 1
  return (
    <div>
      <span>{MIN}</span>
      <span>{Test}</span>
    </div>
  )
}

export default App

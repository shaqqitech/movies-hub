import React from 'react'
import Data from '../components/Data'
import { popular } from '../data/data'


const Popular = () => {
  return (
    <div>
      <Data data={popular.request} title={popular.title} route={popular.route}/>
    </div>
  )
}

export default Popular
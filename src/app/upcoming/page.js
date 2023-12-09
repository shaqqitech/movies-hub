import React from 'react'
import Data from '../components/Data'
import { upcoming } from '../data/data'


const UpComing = () => {
  return (
    <div>
      <Data data={upcoming.request} title={upcoming.title} route={upcoming.route}/>
    </div>
  )
}

export default UpComing
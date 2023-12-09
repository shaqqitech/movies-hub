import React from 'react'
import Data from '../components/Data'
import { airing_today } from '../data/data'


const AiringToday = () => {
  return (
    <div>
      <Data data={airing_today.request} title={airing_today.title} route={airing_today.route}/>
    </div>
  )
}

export default AiringToday
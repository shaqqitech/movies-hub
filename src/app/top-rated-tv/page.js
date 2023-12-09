import React from 'react'
import Data from '../components/Data'
import { top_rated_tv } from '../data/data'


const TopRatedTv = () => {
  return (
    <div>
      <Data data={top_rated_tv.request} title={top_rated_tv.title} route={top_rated_tv.route}/>
    </div>
  )
}

export default TopRatedTv
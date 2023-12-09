import React from 'react'
import Data from '../components/Data'
import { top_rated } from '../data/data'


const TopRated = () => {
  return (
    <div>
      <Data data={top_rated.request} title={top_rated.title} route={top_rated.route}/>
    </div>
  )
}

export default TopRated
import React from 'react'
import Data from '../components/Data'
import { popularTv } from '../data/data'


const PopularTv = () => {
  return (
    <div>
      <Data data={popularTv.request} title={popularTv.title} route={popularTv.route}/>
    </div>
  )
}

export default PopularTv
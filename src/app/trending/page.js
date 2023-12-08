import React from 'react'
import Data from '../components/Data'
import { trending } from '../data/data'


const Trending = () => {
  return (
    <div>
      <Data data={trending.request} title={trending.title}/>
    </div>
  )
}

export default Trending
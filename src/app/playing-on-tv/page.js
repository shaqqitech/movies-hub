import React from 'react'
import Data from '../components/Data'
import { playing_on_tv } from '../data/data'


const PlayingOnTv = () => {
  return (
    <div>
      <Data data={playing_on_tv.request} title={playing_on_tv.title} route={playing_on_tv.route}/>
    </div>
  )
}

export default PlayingOnTv
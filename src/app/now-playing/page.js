import React from 'react'
import Data from '../components/Data'
import { now_playing } from '../data/data'


const NowPlaying = () => {
  return (
    <div>
      <Data data={now_playing.request} title={now_playing.title} route={now_playing.route}/>
    </div>
  )
}

export default NowPlaying
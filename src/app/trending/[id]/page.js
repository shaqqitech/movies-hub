import Route from '@/app/components/Route'
import React from 'react'

const Page = ({params}) => {
  return (
    <div>
        <Route params={params.id}/>
    </div>
  )
}

export default Page
import React from 'react'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'

function Home() {
  return (
    <div className='grid grid-flow-row gap-36  items-center justify-center h-[100vh]'>
          <div className=""><Header /></div>
          <div className="">1</div>
          <div className=""><Footer /></div>
    </div>
  )
}

export default Home
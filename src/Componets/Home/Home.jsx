import React from 'react'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'
import AddNote from '../NoteCompo/AddNote/AddNote'
import ShowNote from '../NoteCompo/ShowNote/ShowNote'

function Home() {
  return (
    <div className=''>
      <div className=""><Header /></div>
      <div className="grid grid-flow-row gap-36 mt-10  items-center justify-center">
       
        <div className="grid grid-flow-row gap-5">
            
            <div className="grid grid-flow-row gap-5 items-center justify-center">
              <AddNote />
            </div>
            
            <ShowNote />
        </div>

      </div>
      <div className=""><Footer /></div>
    </div>
  )
}

export default Home
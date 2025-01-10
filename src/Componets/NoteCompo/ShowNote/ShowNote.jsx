import React, { useEffect, useState } from 'react'
import NoteCard from './NoteCard'

function ShowNote() {

    const [array, setArray] = useState([]);
    
        useEffect(() => {
            fetch("http://localhost:3000/api/note")
                .then((response) => response.json())
                .then((data) => {
                    setArray(data);
                })
                .catch((error) => {
                    // console.error("Error fetching data:", error);
                });
        },);
        

  return (
    <div className=' grid grid-flow-col gap-3'>
        {
            array.map((note,key)=>{
                return <NoteCard note={note} key={key}/>
            })
        }
        
    </div>
  )
}

export default ShowNote
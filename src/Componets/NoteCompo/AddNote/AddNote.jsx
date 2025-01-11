import React, { useState } from 'react'
import Swal from 'sweetalert2';

function AddNote() {

    const [heading,setHeading]=useState("");
    const [description,setDescription]=useState("");

    const getNote=(heading,description)=>{
        return {"heading":heading,"description":description}
    }

    const onSubmit = (e) => {
        e.preventDefault();


        const note = getNote(heading,description);


        fetch("http://localhost:3000/api/note", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("note added:", data);
                Swal.fire({
                    title: "Note Added Successful!",
                    icon: "success",
                });

     
            })
            .catch((error) => {
                console.error("Error posting user:", error);
                Swal.fire({
                    title: "Note Added Failed!",
                    icon: "error",
                    text: "There was an error while you adding your note. Please try again.",
                });
            });
            
            setHeading('');
            setDescription('')
    }

    return (
        <div className='border-2 border-sky-400 w-[400px] h-[500px] rounded-md p-11'>
            <h1 className='text-white text-center text-4xl font-semibold mb-8'>ADD Notes</h1>
            <form action="" onSubmit={onSubmit} className='mt-4 grid grid-flow-row gap-7'>

                <input type="text" name="heading"
                    placeholder='Enter Your Note Heading....'
                     className="text-white font-medium border-2 p-2 rounded-md bg-transparent outline-none from-neutral-500"
                    required
                    value={heading}
                    onChange={(e)=>setHeading(e.target.value)}
                />

                <textarea name="note"
                    placeholder='Enter Your Note Here....'
                    className='text-white font-medium border-2 p-2 rounded-md bg-transparent outline-none from-neutral-500 h-[220px] resize-none'
                    required
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
                <button type='submit' className='text-white w-full p-3 rounded-md font-medium bg-black hover:opacity-80'>ADD NOTE</button>
            </form>
        </div>
    )
}

export default AddNote
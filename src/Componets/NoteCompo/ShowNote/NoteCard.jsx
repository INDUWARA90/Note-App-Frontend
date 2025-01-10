import React from 'react';

function NoteCard({ note }) {

  const handelDelete = (e, id) => {
    e.preventDefault();
    
    fetch(`http://localhost:3000/api/note/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete resource');
        }
        return response.json();
      })
      .then(data => {
        console.log('Resource deleted:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg hover:scale-105 transition-all duration-300">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{note.heading}</div>
          <p className="text-gray-700 text-base">
            {note.description}
          </p>
        </div>
        
        <div className='grid items-center justify-center grid-flow-col gap-4 m-3'>
          <button className='bg-black text-white p-2' onClick={(e) => handelDelete(e, note._id)}>Delete</button>
          <button className='bg-black text-white p-2'>Update</button>
        </div>
      </div>
    </>
  );
}

export default NoteCard;

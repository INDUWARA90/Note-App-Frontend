import React, { useState } from 'react';
import Swal from "sweetalert2";

function NoteCard({ note, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateHeadingState, setUpdateHeadingState] = useState("");
  const [updateNoteState, setUpdateNoteState] = useState("");

  // Corrected the function name from 'hadelOpen' to 'handleOpen'
  const handleOpen = (id) => {
    setIsModalOpen(true);

    fetch(`http://localhost:3000/api/note/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdateHeadingState(data.heading);
        setUpdateNoteState(data.description);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Corrected the function name from 'hadelClose' to 'handleClose'
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const updateNote = (id) => {
    if (!updateHeadingState || !updateNoteState) {
      Swal.fire({
        icon: "warning",
        title: "Please fill in all fields",
        text: "You must update both heading and description",
      });
      return;
    }

    fetch(`http://localhost:3000/api/note/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        heading: updateHeadingState,
        description: updateNoteState,
      })
    })
      .then(response => {
        if (!response.ok) {
          Swal.fire({
            icon: "error",
            title: "Note Update Unsuccessful!",
            text: "Please try Again!",
          });
          throw new Error('Failed to update resource');
        }
        Swal.fire({
          title: "Note Updated Successfully!",
          icon: "success"
        });
        setIsModalOpen(false);
        return response.json();
      })
      .then((data) => {
        console.log('Resource Updated:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Delete note function
  const handleDelete = (e, id) => {
    e.preventDefault();

    fetch(`http://localhost:3000/api/note/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete resource');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Note Deleted:', data);
        onDelete(id); // Callback to parent to remove the deleted note
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white max-w-sm rounded overflow-hidden shadow-lg transition-all duration-300 hover:scale-105">
        <div className="px-6 py-4">
          <div className="font-bold text-2xl mb-4 text-center">{note.heading}</div>
          <p className="text-white opacity-70 text-base">
            {note.description}
          </p>
        </div>

        <div className='grid items-center justify-center grid-flow-col gap-4 m-3'>
          <button className='bg-black text-white p-2 rounded-md' onClick={(e) => handleDelete(e, note._id)}>Delete</button>
          <button
            className='bg-black text-white p-2 rounded-md'
            onClick={() => handleOpen(note._id)}>
            Update
          </button>
        </div>
      </div>

      {/* Modal for updating the note */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4 text-center">Update Your Note</h2>

            <input
              type="text"
              className='border-2 p-2 w-full rounded-md'
              value={updateHeadingState}
              onChange={(e) => setUpdateHeadingState(e.target.value)}
              placeholder='Update Your Note Heading Here...'
            />
            <textarea
              className='border-2 p-2 w-full mt-2 h-[350px] resize-none rounded-md '
              value={updateNoteState}
              onChange={(e) => setUpdateNoteState(e.target.value)}
              placeholder='Update Your Note Here...'
            />
            <div className=' grid grid-flow-col gap-5 justify-center items-center'>
              <button
                onClick={handleClose}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              >
                Close
              </button>

              <button
                onClick={() => updateNote(note._id)}
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NoteCard;

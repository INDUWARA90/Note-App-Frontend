import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

function Header() {

  const [note, setNote] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handelInput(event.target.value)
    }
  }

  const handelInput = (value) => {
    const note = array.find((element) => element.heading === value);

    if (note) {
      //set data
      setNote(note)
      
      console.log(note);
      
      //load modal
      setIsModalOpen(true);
    } else {
      console.log("Note Not have");
    }

  }

  //close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //array to store data
  const [array, setArray] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/note")
      .then((response) => response.json())
      .then((data) => {
        setArray(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  
  return (

    <header className="bg-white rounded-lg shadow m-3 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between">
        <span className="text-xl text-gray-500 sm:text-center dark:text-gray-400 ">Welcome To Note Hub <br /></span>
        <input type="text"
          placeholder='search here Your notes...'
          className='p-2 rounded-md outline-none'
          onKeyDown={handleKeyDown}
        />


        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-2xl font-semibold mb-4">{note.heading}</h2>
              <p className="mb-4">{note.description}</p>
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  )
}

export default Header
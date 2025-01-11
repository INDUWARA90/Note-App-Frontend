import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Header() {
  const [note, setNote] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateHeadingState, setUpdateHeadingState] = useState("");
  const [updateNoteState, setupdateNoteState] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handelInput(event.target.value);
    }
  };

  const handelInput = (value) => {
    const note = array.find((element) => element.heading === value);

    if (note) {
      setNote(note);

      hadelOpen(note._id);
    } else {
      console.log("Note Not have");
    }
  };

  const hadelOpen = (id) => {
    setIsModalOpen(true);

    fetch(`http://localhost:3000/api/note/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdateHeadingState(data.heading);
        setupdateNoteState(data.description);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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


  const updateNote = (id) => {
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
            title: "Note Updated UnSuccessfully!",
            text: "Please try Again!",
          });
          throw new Error('Failed to update resource');
        }
        Swal.fire({
          title: "Note Updated Successfully!",
          icon: "success"
        });
        setIsModalOpen(false)
        return response.json();
      })
      .then(data => {
        console.log('Resource Updated:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <header className=" py-5 bg-transparent">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between">
        <span className="text-2xl text-gray-500 sm:text-center dark:text-gray-100   hover:text-gray-300 hover:cursor-pointer">
          Welcome To Note Hub <br />
        </span>
        <input
          type="text"
          placeholder="search here Your notes..."
          className="p-2 rounded-md outline-none"
          onKeyDown={handleKeyDown}
        />

        {/* Modal */}
        {isModalOpen &&
          (
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
                  onChange={(e) => setupdateNoteState(e.target.value)}
                  placeholder='Update Your Note Here...'
                />
                <div className=' grid grid-flow-col gap-5 justify-center items-center'>
                  <button
                    onClick={closeModal}
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
          )
        }
      </div>
    </header>
  );
}

export default Header;

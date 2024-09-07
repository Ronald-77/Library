import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

export default function AuthorEdit() {
  let { id } = useParams();  // Get the id from the URL
  const [authorName, setAuthorName] = useState('');
  const navigate = useNavigate();

  // Fetch the original name if an id is present
  useEffect(() => {
    const fetchOriginalName = () => {
      if (id) {
        fetch(`http://127.0.0.1:4444/author/${id}`)
          .then(res => res.json())
          .then(res => {
            setAuthorName(res.name);
          })
          .catch(err => console.log(err));
      }
    };

    fetchOriginalName();
  }, [id]);

  // Create or update author
  const handleSubmit = () => {
    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://127.0.0.1:4444/author/${id}` : 'http://127.0.0.1:4444/author';
    const body = JSON.stringify({ name: authorName });

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Auth": "cb23d25a-1d84-469e-b46c-266884535e50"
      },
      body
    })
      .then(res => res.json())
      .then(res => {
        alert(res.Message);
        navigate('/create');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-xs mb-[300px]">
        <form className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Add an Author's name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Author Name" // Placeholder text
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)} // Update state on change
            />
          </div>
          <button
            className="shadow bg-primary focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={handleSubmit} // Call handleSubmit on button click
          >
            {id ? 'Update' : 'Create'} {/* Update button text based on id presence */}
          </button>
        </form>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import useTheme from '../hooks/useTheme';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();
  let navigate = useNavigate();
  let key = sessionStorage.getItem('key');
  let adminKey = sessionStorage.getItem('adminKey');

  useEffect(() => {
    if (!key) {
      // alert('You must be logged in to view your profile');
      navigate('/login');
    }
    const fetchData = async () => {
      try {
        const profileResponse = await fetch('http://localhost:4444/profile', {
          headers: { "Auth": key }
        });
        const profileData = await profileResponse.json();
        setProfile(profileData);

        const booksResponse = await fetch('http://localhost:4444/profile/books', {
          headers: { "Auth": key }
        });
        const booksData = await booksResponse.json();
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key]);

  const handleLogout = () => {
    sessionStorage.removeItem('key');
    sessionStorage.removeItem('adminKey');
    alert('Logged out successfully');
    navigate('/');  // Navigate to the homepage or login page after logout
    window.location.reload(); // Reload the page to reset the UI
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={`max-w-4xl mx-auto my-32 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {/* Profile Section */}
      <div className={`w-full lg:w-3/5 rounded-lg shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} opacity-75 mx-6 lg:mx-0`}>
        <div className="p-4 md:p-12 text-center lg:text-left">
          <h1 className="text-3xl font-bold pt-8 lg:pt-0">{profile?.fullName}</h1>
          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
            {profile?.email}
          </p>
          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
            Total Fees : {profile?.fees} MMK
          </p>

          <div className="pt-12 pb-8">
            <Button variant="outlined" color="error" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </div>

      {/* Borrowed Books Section */}
      <div className={`mt-12 ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'} p-6 rounded-lg shadow-md`}>
        <h2 className="text-2xl font-bold mb-4">Borrowed Books</h2>
        {books.length === 0 ? (
          <p>No books borrowed.</p>
        ) : (
          <ul>
            {books.map((book) => (
              <li key={book.id} className="mb-4 p-4 border-b border-gray-300">
                <div className='flex'>
                  <div className='flex-grow w-1/2'>
                    <h3 className="text-xl font-semibold">{book.title}</h3>
                    <p className="text-gray-600">Author: {book.author.name}</p>
                    <p>{book.description}</p>
                    <p className="text-gray-600">Return Date: {book.returnDate}</p>
                  </div>
                  <div className='flex-grow text-end'>
                    <button
                      type="button"
                      onClick={() => navigate(`/books/${book.id}`)}
                      className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                    >
                      Book Detail
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;

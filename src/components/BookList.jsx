import React, { useLayoutEffect, useRef, useState } from 'react';
import bookImg from "../assets/book.jpg";
import useFetch from '../hooks/useFetch';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

export default function BookList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get('search');
  const { data: books, loading, error, deleteItem } = useFetch(`http://127.0.0.1:4444/book${search ? `?q=${search}` : ''}`);
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(true);

  const [maxHeight, setMaxHeight] = useState(0);
  const itemRefs = useRef([]);

  useLayoutEffect(() => {
    if (books && Object.keys(books).length) {
      requestAnimationFrame(() => {
        const heights = itemRefs.current.map(ref => ref ? ref.clientHeight : 0);
        const max = Math.max(...heights);
        setMaxHeight(max);
      });
    }
  }, [books]);


  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

console.log(books)
  return (
    <div>
      {loading && <p>Loading ...</p>}

      {books && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-7 lg:gap-8 my-3">
          {Object.values(books).map((b, index) => (
            <div
              key={b.id}
              className='shadow-ttt flex flex-col'  
              ref={(el) => (itemRefs.current[index] = el)}
              style={{ minHeight: `${maxHeight}px` }}
            >
              <div className={`p-4 border border-1 text-primary flex-grow justify-center ${isDark ? 'bg-dcard border-primary text-white' : 'bg-gray-100'}`}>
                <Link to={`/books/${b.id}`} key={b.id} className='items-center justify-center'>
                  <div className='items-center justify-center'>
                    <img className='h-[288px] w-[100%]' src={b.path ? "http://127.0.0.1:4444"+b.path : bookImg} alt={b.title} />
                  </div>
                </Link>
                <div className="text-center ">
                  <h1 className='font-bold mt-4'>{b.title}</h1>
                  <p className='font-bold my-2'>Author - {b.author.name}</p>
                  <p>{b.description}</p>
                  
                </div>
              </div>
              {isAdmin && (
                <div className='bg-primary p-2 flex justify-around'>
                  <button
                    className='bg-green-500 text-white px-2 py-1 rounded'
                    onClick={() => navigate(`/books/${b.id}`)}
                  >
                    View Info
                  </button>
                  <button
                    className='bg-blue-500 text-white px-2 py-1 rounded'
                    onClick={() => navigate(`/create/${b.id}`)}
                  >
                    Update
                  </button>
                  
                  <button
                    className='bg-red-500 text-white px-2 py-1 rounded'
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {books && !Object.keys(books).length && <p className='text-center text-xl text-gray-500'>No Search Results Found</p>}
    </div>
    
    
  );
}

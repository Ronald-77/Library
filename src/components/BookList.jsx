import React, { useLayoutEffect, useRef, useState } from 'react';
import bookImg from "../assets/book.jpg";
import useFetch from '../hooks/useFetch';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

export default function BookList() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get('search');
  const { data: books, loading, error, deleteItem } = useFetch(`http://localhost:3000/books${search ? `?q=${search}` : ''}`);
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(true);

  const [maxHeight, setMaxHeight] = useState(0);
  const itemRefs = useRef([]);

  useLayoutEffect(() => {
    if (books && books.length) {
      requestAnimationFrame(() => {
        const heights = itemRefs.current.map(ref => ref ? ref.clientHeight : 0); // Add null check here
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

  return (
    <div>
      {loading && <p>Loading ...</p>}

      {!!books && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-7 lg:gap-8 my-3">
          {books.map((b, index) => (
            <div
              key={b.id}
              className='shadow-ttt flex flex-col'
              ref={(el) => (itemRefs.current[index] = el)}
              style={{ minHeight: `${maxHeight}px` }}
            >
              <div className={`p-4 border border-1 text-primary flex-grow ${isDark ? 'bg-dcard border-primary text-white' : 'bg-gray-100'}`}>
                <Link to={`/books/${b.id}`} key={b.id}>
                  <img src={b.imageUrl ? b.imageUrl : bookImg} alt={b.title} />
                </Link>
                <div className="text-center space-y-2">
                  <h1 className='font-bold'>{b.title}</h1>
                  <p className='font-bold'>Author - {b.author}</p>
                  <p>{b.description}</p>
                  <div className="flex flex-wrap">
                    {b.categories.map((c) => (
                      <span key={c} className="mx-1 my-1 text-white rounded-full px-2 py-2 text-sm bg-primary">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
              {isAdmin && (
                <div className='bg-primary p-2 flex justify-around'>
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
      {books && !books.length && <p className='text-center text-xl text-gray-500'>No Search Results Found</p>}
    </div>
  );
}

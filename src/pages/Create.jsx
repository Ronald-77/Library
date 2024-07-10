import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useTheme from '../hooks/useTheme';

export default function Create() {
    let { id } = useParams();  // Get the id from the URL
    let [title, setTitle] = useState('');
    let [author, setAuthor] = useState('');
    let [description, setDescription] = useState('');
    let [newCategory, setNewCategory] = useState('');
    let [categories, setCategories] = useState([]);

    let navigate = useNavigate();
    let { doRequest: setPostData, data: book } = useFetch('http://localhost:3000/books', "POST");
    let { doRequest: updateBookData } = useFetch(`http://localhost:3000/books/${id}`, "PUT");
    let { doRequest: fetchBookData, data: fetchedBook } = useFetch(`http://localhost:3000/books/${id}`, "GET");

    useEffect(() => {
        if (id) {
            fetchBookData();
        }
    }, [id]);

    useEffect(() => {
        if (fetchedBook) {
            setTitle(fetchedBook.title);
            setDescription(fetchedBook.description);
            setCategories(fetchedBook.categories);
            setAuthor(fetchedBook.author);
        }
    }, [fetchedBook]);

    let addCategory = (e) => {
        if (newCategory && categories.includes(newCategory)) {
            setNewCategory('');
            return;
        }
        setCategories(prev => [newCategory, ...prev]);
        setNewCategory('');
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            title,
            author,
            description,
            categories
        };
        try {
            if (id) {
                await updateBookData(data);
            } else {
                await setPostData(data);
            }
            navigate('/');
        } catch (error) {
            console.error('Error updating/creating book:', error);
            // Optionally, you can handle the error or display a message to the user
        }
    };
    

    useEffect(() => {
        if (book && fetchedBook) {
            navigate('/');
        }
    }, [book, fetchedBook]);

    let { isDark } = useTheme();

    return (
        <div className='h-screen'>
            <form className="w-full max-w-lg mx-auto mt-5" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-title">
                            Book Title
                        </label>
                        <input value={title} onChange={e => setTitle(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="Book Title" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-title">
                            Author
                        </label>
                        <input value={author} onChange={e => setAuthor(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="Book's author" />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-description">
                            Book Description
                        </label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-description" placeholder="Book Description" />
                        <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-categories">
                            Categories
                        </label>
                        <div className="flex items-center space-x-2">
                            <input value={newCategory} onChange={e => setNewCategory(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-categories" type="text" placeholder="Book Category" />
                            <button type='button' onClick={addCategory} className="bg-primary p-1 rounded-lg mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 p-1 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-wrap'>
                        {categories.map(c => (
                            <span key={c} className='mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-primary'>{c}</span>
                        ))}
                    </div>
                </div>
                <button className='text-white bg-primary px-3 py-2 rounded-2xl flex justify-center items-center gap-1 w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="hidden md:block">{id ? 'Update Book' : 'Create Book'}</span>
                </button>
            </form>
        </div>
    )
}

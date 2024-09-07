import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useTheme from '../hooks/useTheme';

async function createBook({ id = "", method = "POST", body, navigate }) {
    try {
        const authKey = sessionStorage.getItem('adminKey'); // Retrieve the auth key from sessionStorage
        if (!authKey) {
            throw new Error('Authentication key is missing.');
        }

        const response = await fetch(`http://127.0.0.1:4444/book${id ? `/${id}` : ""}`, {
            method,
            headers: {
                "Auth": authKey
                // Note: FormData automatically sets the correct Content-Type header
            },
            body
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Something went wrong');
        }

        const result = await response.json();
        alert(result.message);
        navigate('/');
    } catch (error) {
        console.error('Error:', error);
        alert(`Failed to save the book: ${error.message}`);
    }
}

export default function Create() {
    let { id } = useParams();
    let [title, setTitle] = useState('');
    let [author, setAuthor] = useState('');
    let [description, setDescription] = useState('');
    let [image, setImage] = useState(null);
    let [previewImage, setPreviewImage] = useState('');
    let navigate = useNavigate();

    let { doRequest: fetchBookData, data: fetchedBook } = useFetch(`http://127.0.0.1:4444/book/${id}`, "GET");
    let { doRequest: fetchAuthorData, data: fetchedAuthor } = useFetch(`http://127.0.0.1:4444/author`, "GET");

    useEffect(() => {
        if (id) {
            fetchBookData();
        }
    }, [id]);

    useEffect(() => {
        if (fetchedBook) {
            setTitle(fetchedBook.title);
            setDescription(fetchedBook.description);
            setAuthor(fetchedBook.author.name);
            if (fetchedBook.path) {
                setPreviewImage(`http://127.0.0.1:4444${fetchedBook.path}`);
            }
        }
    }, [fetchedBook]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }

        await createBook({ id, method: id ? "PUT" : "POST", body: formData, navigate });
    };

    let { isDark } = useTheme();

    return (
        <div className='h-screen'>
            <form className="w-full max-w-lg mx-auto mt-5" name="book-form" onSubmit={handleSubmit}>
                {/* Title */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-title">
                            Book Title
                        </label>
                        <input value={title} onChange={e => setTitle(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" name="title" placeholder="Book Title" />
                    </div>
                </div>
                {/* Author */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-author">
                            Author
                        </label>
                        <select onChange={e => {
                            if (e.target.value === "add") {
                                navigate('/author');
                            }
                            setAuthor(e.target.value);
                        }} className="appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-author" name="author" placeholder="Book's author">
                            <option defaultValue>Choose An Author</option>
                            {fetchedAuthor && fetchedAuthor.map(author => (
                                <option key={author.id} value={author.name}>{author.name}</option>
                            ))}
                            <option value="add">+ Add</option>
                        </select>
                    </div>
                </div>
                {/* Description */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-description">
                            Book Description
                        </label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-description" name="description" placeholder="Book Description" />
                        <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                    </div>
                </div>
                {/* Image Upload */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-image">
                            Book Cover Image
                        </label>
                        <input onChange={handleImageChange} className={`appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="grid-image" type="file" accept="image/*" disabled={id ? true : false} />
                    </div>
                    {previewImage && (
                        <div className="w-full px-3 mt-3">
                            <img src={previewImage} alt="Preview" className={`max-w-full h-auto ${id ? 'hidden' : ''}`} />
                        </div>
                    )}
                </div>
                {/* Submit Button */}
                <button className='text-white bg-primary px-3 py-2 rounded-2xl flex justify-center items-center gap-1 w-full' type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="hidden md:block">{id ? 'Update Book' : 'Create Book'}</span>
                </button>
            </form>
        </div>
    );
}

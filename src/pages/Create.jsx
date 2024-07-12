import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useTheme from '../hooks/useTheme';

export default function Create() {
    let { id } = useParams();  // Get the id from the URL
    let [title, setTitle] = useState('');
    let [author, setAuthor] = useState('');
    let [description, setDescription] = useState('');
    let [image, setImage] = useState(null);  // State to hold the selected image file
    let [previewImage, setPreviewImage] = useState('');  // State to hold the preview of the selected image
    let navigate = useNavigate();

    // UseFetch hooks for API requests
    let { doRequest: setPostData, data: book } = useFetch('http://127.0.0.1:4444/book/add', "POST");
    let { doRequest: updateBookData } = useFetch(`http://127.0.0.1:4444/book/${id}`, "PUT");
    let { doRequest: fetchBookData, data: fetchedBook } = useFetch(`http://127.0.0.1:4444/book/${id}`, "GET");

    // Fetch book data if editing existing book
    useEffect(() => {
        if (id) {
            fetchBookData();
        }
    }, [id]);

    // Populate form fields with fetched book data
    useEffect(() => {
        if (fetchedBook) {
            setTitle(fetchedBook.title);
            setDescription(fetchedBook.description);
            setAuthor(fetchedBook.author);
            // Set preview image URL if image exists
            if (fetchedBook.path) {
                setPreviewImage(`http://127.0.0.1:4444${fetchedBook.path}`);
            }
        }
    }, [fetchedBook]);

    // Handle image file selection
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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare form data
        let formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('description', description);
        if (image) {
            formData.append('image', image);
        }
        
        try {
            if (id) {
                await updateBookData(formData);
            } else {
                // await setPostData(formData);
                e.target.submit();
            }
            navigate('/');
        } catch (error) {
            console.error('Error updating/creating book:', error);
            // Optionally, you can handle the error or display a message to the user
        }
    };

    // Navigate back to home page when book creation/update is successful
    useEffect(() => {
        if (book && fetchedBook) {
            navigate('/');
        }
    }, [book, fetchedBook]);

    // Theme context
    let { isDark } = useTheme();

    return (
        <div className='h-screen'>
            <form className="w-full max-w-lg mx-auto mt-5" onSubmit={handleSubmit}>
                {/* Title */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-title">
                            Book Title
                        </label>
                        <input value={title} onChange={e => setTitle(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="Book Title" />
                    </div>
                </div>
                {/* Author */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-title">
                            Author
                        </label>
                        <input value={author.name} onChange={e => setAuthor(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-title" type="text" placeholder="Book's author" />
                    </div>
                </div>
                {/* Description */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-description">
                            Book Description
                        </label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-description" placeholder="Book Description" />
                        <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                    </div>
                </div>
                {/* Image Upload */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-image">
                            Book Cover Image
                        </label>
                        <input onChange={handleImageChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-image" type="file" accept="image/*" />
                    </div>
                    {/* Preview Image */}
                    {previewImage && (
                        <div className="w-full px-3 mt-3">
                            <img src={previewImage} alt="Preview" className="max-w-full h-auto" />
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
    )
}

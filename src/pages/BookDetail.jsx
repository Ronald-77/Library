import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Button from '@mui/material/Button';
import useTheme from '../hooks/useTheme';

export default function BookDetail() {
    let { id } = useParams();
    let { isDark } = useTheme();
    let { data: bookDetail, loading, error, refetch } = useFetch(`http://localhost:4444/book/${id}`);
    let [book, setBook] = useState(null);
    let [qrCode, setQrCode] = useState(null); // State to hold the QR code URL

    useEffect(() => {
        if (bookDetail) {
            setBook(bookDetail);
        }
    }, [bookDetail]);

    let borrowBook = (type) => {
        let key = sessionStorage.getItem('key');
        if (!key) {
            alert('You must be logged in as a user to borrow a book');
            return;
        }
        fetch(`http://127.0.0.1:4444/book/${type}/${id}`, {
            method: "POST",
            headers: {
                "Auth": key
            }
        })
        .then(res => {
            if (res.headers.get('Content-Type') === 'image/png') {
                return res.blob(); // Handle QR code image response
            }
            return res.json();
        })
        .then(blob => {
            if (blob instanceof Blob) {
                // Create a URL for the QR code image
                setQrCode(URL.createObjectURL(blob));
                alert("Borrowed successfully");
            } else {
                alert(blob.Message);
                refetch();
            }
        })
        .catch(err => {
            console.error('Error:', err);
            alert('An error occurred while borrowing the book.');
        });
    };

    const downloadQRCode = () => {
        if (qrCode) {
            const link = document.createElement('a');
            link.href = qrCode;
            link.download = 'qrcode.png'; // Set the file name for download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            {book && (
                <div className={`mt-3 grid grid-cols-2 h-screen ${isDark ? 'text-white' : ''}`}>
                    <div>
                        <img src={`http://127.0.0.1:4444${book.path}`} alt="" className='w-[80%]' />
                    </div>
                    <div className='space-y-4'>
                        <h1 className="text-3xl font-bold">{book.title}</h1>
                        <div className='flex space-x-1 w-[100%] items-center'>
                            <p className='text-lg'> Author : </p>
                            <p className='text-lg font-bold'> {book.author.name} </p>
                        </div>
                        <p className='text-lg'>
                            {book.description}
                        </p>
                        <div className='text-[18px] mt-4'>
                            <div className='flex'>
                                <p className='flex-grow font-[550] w-1/4'>Available</p>
                                <p className='flex-grow w-2/4'>{book.available ? "Yes" : "Taken"}</p>
                            </div>
                            <div className='flex'>
                                <p className='flex-grow font-[550] w-1/4'>Will Be Available After</p>
                                <p className='flex-grow w-2/4'>{book.returnDate || "None"}</p>
                            </div>
                            <div className='flex'>
                                <p className='flex-grow font-[550] w-1/4'>Borrowed User</p>
                                <p className='flex-grow w-2/4'>{book.userEmail || "None"}</p>
                            </div>

                            <div className='flex mt-[20px]'>
                                <div className='flex-grow w-1/4'>
                                    <Button variant="outlined" color="success" onClick={() => { borrowBook("borrow") }}>Borrow</Button>
                                </div>
                                <div className='flex-grow w-3/4'>
                                    <Button variant="outlined" color="error" onClick={() => { borrowBook("return") }}>Return</Button>
                                </div>
                            </div>

                            {/* Display QR Code if available */}
                            {qrCode && (
                                <div className='mt-4'>
                                    <h2 className='text-2xl font-bold'>Capture this QR Code</h2>
                                    <img src={qrCode} alt="QR Code" className='my-2' />
                                    <Button variant="outlined" color="error" onClick={downloadQRCode}>Download</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

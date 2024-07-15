import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import Button from '@mui/material/Button';
import useTheme from '../hooks/useTheme';

export default function BookDetail() {
    let {id} = useParams();
    let {isDark} = useTheme();
    let {data: bookDetail, loading, error, refetch} = useFetch(`http://localhost:4444/book/${id}`);
    let [book, setBook] = useState(null);

    useEffect(() => {
        if (bookDetail) {
            setBook(bookDetail);
        }
    }, [bookDetail]);

    let borrowBook = (type) => {
        let key = localStorage.getItem('key')
        if(!key){
            alert('You must be logged in to borrow a book');
            return;
        }
        fetch(`http://127.0.0.1:4444/book/${type}/${id}`, {
            method: "POST",
            headers: {
                "Auth": key
            }
        })
        .then(res => res.json())
        .then(res => {
            alert(res.Message);
            refetch();
        })
    }

    return (
        <>
            {error && <p>{error}</p>}
            {loading && <p>loading...</p>}
            {book && (
                <div className={`mt-3 grid grid-cols-2 h-screen ${isDark ? 'text-white' : ''}`}>
                    <div>
                        <img src={"http://127.0.0.1:4444"+book.path} alt="" className='w-[80%]'/>
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
                        {<div className='text-[18px]  mt-4'>
                            <div className='flex'>
                                <p className='flex-grow font-[550] w-1/4'>Avaliable</p>
                                <p className='flex-grow w-2/4'>{book.available ? "Yes" : "Taken"}</p>
                            </div>
                            <div className='flex'>
                                <p className='flex-grow font-[550] w-1/4'>Will Be Available After </p>
                                <p className='flex-grow w-2/4'>{book.returnDate || "None"}</p>
                            </div>
                            <div className='flex'>
                                <p className='flex-grow font-[550] w-1/4'>Borrowed User  </p>
                                <p className='flex-grow w-2/4'>{book.userEmail || "None"}</p>
                            </div>
                            
                            <div className='flex mt-[20px] '>
                                <div className='flex-grow w-1/4'>
                                    <Button variant="outlined" color="success" onClick={()=>{borrowBook("borrow")}}>Borrow</Button>
                                </div>
                                <div className='flex-grow w-3/4'>
                                    <Button variant="outlined"  color="error" onClick={()=>{borrowBook("return")}}>Return</Button>
                                </div>
                                
                            </div>
                        </div>}
                        
                    </div>
                </div>
            )}
        </>
    )
}
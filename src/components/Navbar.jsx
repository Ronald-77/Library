import React, {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import photo from '../assets/mi-Photoroom.jpg'
import useTheme from '../hooks/useTheme';
import lightIcon from '../assets/light.svg';
import darkIcon from '../assets/dark.svg';


export default function Navbar() {

    let [search, setSearch] = useState('');
    let navigate = useNavigate();
    let [isAdmin,setIsAdmin] = useState(true)
    
    let handleSearch = (e) => {
        navigate('/?search=' + search);
    }

    let {isDark ,changeTheme} = useTheme();

  return (
    <nav className={`border border-b-1 ${isDark ? 'bg-dbg border-primary' : 'bg-white'}`}>
        <ul className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
            
            <Link to="/" className='flex items-center gap-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isDark ? 'text-white' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                </svg>
                <span className="text-2xl font-bold text-primary hidden md-custom:block">BookStore</span>
            </Link>
            <li className='flex items-center gap-3'>
                
                <input value={search} onChange={e => setSearch(e.target.value)} type="text"  placeholder="Search book..." className='outline-none py-1 px-2 rounded-lg border'/>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={handleSearch} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 hover:cursor-pointer ${isDark ? 'text-white' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </li>
            <li className='flex gap-3 items-center'>

                {isAdmin ?
                <>
                <Link to="/create" className="text-white bg-primary px-3 py-2 rounded-2xl flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span className='hidden md-custom:block'>Create</span>
                </Link>
                
                <div className="w-11 h-11">
                    <img src={photo} alt="" className='w-full h-full rounded-full'/>
                </div>
                </> :

                <button
                    className='bg-primary text-white px-2 py-1 rounded'
                    onClick={() => navigate(`/create/${b.id}`)}
                  >
                    Log In
                </button>
                }
                
                <div className='cursor-pointer'>
                    {isDark && <img src={lightIcon} alt="" onClick={()=>{changeTheme('light')}}/> }
                    {!isDark && <img src={darkIcon} alt="" onClick={()=>{changeTheme('dark')}}/>}
                </div>
                
            </li>
            
        </ul>
      </nav>
  )
}

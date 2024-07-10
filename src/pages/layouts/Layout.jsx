import React, { useEffect } from 'react'
import { Outlet} from 'react-router-dom';
import Navbar from '../../components/Navbar';
import './style.css'
import useTheme from '../../hooks/useTheme';

export default function Layout() {

  

  let {isDark} = useTheme();

  useEffect(()=>{
    let body = document.body;
    if(isDark){
      body.classList.add('bg-dbg');
    }else{
      body.classList.remove('bg-dbg');
    }
  },[isDark])

  return (
    <div className={isDark ? 'bg-dbg' : 'bg-white'}>
        <Navbar/>
        
            <div className="max-w-6xl mx-auto p-3">
              <Outlet/>
            </div>
          
    </div>
  )
}

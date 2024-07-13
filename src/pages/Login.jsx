import React, {useState, useEffect} from 'react'
import useTheme from '../hooks/useTheme'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'



function Login() {
    let navigate = useNavigate();
    useEffect(() => {
        // Check if user is already logged in
        if (localStorage.getItem('key')) {
            alert('You are already logged in');
            navigate('/');
        }
    }, []);
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password,
        }
        await fetch('http://127.0.0.1:4444/auth'
            , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
        .then(res => res.json())
        .then(res => {
             if('key' in res){
                localStorage.setItem('key',res.key);
                alert("Login Successful");
                 navigate('/');
             }
             else{
                alert(res.Message)
             }
         })

    }


    let { isDark } = useTheme();



  return (
    <div className='h-screen'>
            <div className="p-5 flex justify-center items-center">
                <div className="text-center space-y-1">
                    <h1 className="text-green-800 text-3xl">Login to Your Account</h1>
                    <p className="text-green-500 font-[600]">Please fill this form to Login</p>
                </div>
            </div>
            <form className="w-full max-w-lg mx-auto mt-5" >
                
                {/* Email */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-email">
                            Email
                        </label>
                        <input type='email' onChange={e => setEmail(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" placeholder="Email" />
                    </div>
                </div>
                {/* Password */}
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-white' : ''}`} htmlFor="grid-description">
                            Password
                        </label>
                        <input type='password' onChange={e => setPassword(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-description" placeholder="Password" />
                        <p className="text-gray-600 text-xs italic">Make sure no one is behind you</p>
                    </div>
                </div>
               
                {/* Submit Button */}
                <button className='text-white bg-primary px-3 py-2 rounded-2xl flex justify-center items-center gap-1 w-full' type="submit" onClick={handleSubmit}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="hidden md:block">Login</span>

                </button>
                <p className="mt-2 ms-2 text-gray-600 text-md italic">Don't have an account ? <Link to="/register" className='underline'>Register</Link></p>


            </form>

        </div>
  )
}

export default Login
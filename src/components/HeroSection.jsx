import React from 'react'
import { Link , useNavigate} from 'react-router-dom'

export default function HeroSection() {
  let navigate = useNavigate();
  return (
    <div className="p-11 flex justify-center items-center">
        <div className="text-center space-y-2">
          <h1 className="text-green-800 text-3xl">Welcome from Library </h1>
          <p className="text-green-500 text-sm">A place where you can store and manage your books</p>
          <div className="mx-auto max-w-2xl py-10 lg:py-15">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-green-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20 bg-gray-300">
            Two heads are better than one. {' '}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-green-800 sm:text-5xl">
              Hope for the best, but prepare for the worst.
            </h1>
            <p className="mt-6 text-lg leading-8 text-green-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
             <button type="button" onClick={()=>navigate('/login')} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Login
             </button>
              <Link to="/register" className="text-sm font-semibold leading-6 text-blue-700">
                Register <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        </div>
        
      </div>
  )
}

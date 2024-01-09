import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


import { CubeTransparentIcon } from '@heroicons/react/24/solid'
import { logo } from './assets';
import ai_logo from './assets/ai_logo.jpg';
import { Home, CreatePost } from './pages' ;

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex 
      justify-between items-center bg-white 
      sm:px-8 px-4 py-4 border-b-[#e6ebf4]'>
        <Link to="/">
          <CubeTransparentIcon 
            className="inline-block h-10 w-10 text-black-500" 
          />
          <h1 className='font-mono inline-block'>fig.ai</h1>
        </Link>
        <Link 
          to="/create-post" 
          className='font-inter font-medium bg-[#4e09af] text-white px-4 py-2 rounded-md'
        >
          Create
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
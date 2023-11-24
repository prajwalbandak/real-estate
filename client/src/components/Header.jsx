import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
const Header = () => {
  const { currentUser} = useSelector(state=> state.user);
  const[searchTerm , setSearchTerm] = useState('');
   console.log("searchTerm" + searchTerm);
  //console.log("CurrentUser " + currentUser.username);
  // console.log(currentUser.data.avatar)
  // console.log(currentUser.data.username)
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    console.log("url Params" + urlParams);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    console.log("searchQuery" + searchQuery);
    navigate(`/search?${searchQuery}`);
  }
  useEffect(() =>{
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>

       
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            
           <Link to='/'>
            <span className='text-slate-500'>Arun</span>
            <span className='text-slate-700'>Bhalki</span>
            </Link>
            </h1>
            <form
          onSubmit={handleSubmit}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
            <ul className='flex gap-4'>
                <Link to='/'>
                <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li>
                </Link>
                <Link to='/about'>
                <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'> About</li>
                </Link>
                <Link to='/profile'>
                {
                  
                  currentUser ? (<img className='items-center justify-center h-7 w-7 rounded-full object-cover'width="50" height="60" src="../public/profile.jpg" alt="profile" /> ):
                  (
                  <li 
                  className='sm:inline text-slate-700 hover:underline cursor-pointer'>
                    Sign-in</li>
                  )
                }
        </Link>
            </ul>
            
            </div>
    </header>
  )
}

export default Header
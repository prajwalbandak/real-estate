import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
const Header = () => {
  const { currentUser} = useSelector(state=> state.user);
  console.log(currentUser);
 // console.log(currentUser.rest.avatar)
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>

       
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            
           <Link to='/'>
            <span className='text-slate-500'>Arun</span>
            <span className='text-slate-700'>Bhalki</span>
            </Link>
            </h1>
            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input type='text' placeholder='Search....' className='bg-transparent focus:outline-none w-24 sm:w-64 ' />
            <FaSearch className='text-slate-500'/>
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
                  
                  currentUser ? (<img className='items-center justify-center h-7 w-7 rouded-full object-cover'width="50" height="60" src={currentUser.rest.avatar} alt="profile" /> ):
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
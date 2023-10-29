import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  //const currentUser = useSelector((state) => state.user);
  const { currentUser} = useSelector(state=> state.user);
  //console.log(currentUser);
  console.log(currentUser.rest.avatar);
  
  return (

    <div className='p-3 max-w-lg mx-auto gap-4'>
      <h1 className='text-3xl text-center py-7 font-semibold '> Profile</h1>
      <form className='flex flex-col gap-3'> 
        <img className='h-24 w-24  cursor-pointer rounded-full self-center object-cover'src={currentUser.rest.avatar} alt='profile' />
        <input type='text' placeholder='userName' id='username'
        className='rounded-lg p-3 border gap-2'></input> 
        <input type='text' placeholder='email' id='email' className='rounded-lg p-3 border gap-2'></input> 
        <input type='password' placeholder='password' id='password' className='rounded-lg p-3 border gap-2'></input> 
        <button className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-70 p-3' >update</button>
      </form>
      <div className='text-red-700 justify-between flex mt-3'>
      <span>delete account</span>
      <span>Sign out</span>

      </div>
    
    </div>
  )
}

export default Profile
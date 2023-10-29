import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';

const Signup = () => {
  const[formData, setFormData] = useState({});
  const[error, setError ] = useState('');
  const[loading, setLoading] = useState(false);
const navigate = useNavigate(); 
  const handleChange = (e) =>{
      setFormData({
        ...formData, //spread operator hold the old data;
        [e.target.id] : e.target.value 
      })
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/auth/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Use lowercase 'application'
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
  
      if(data.success == false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
      }catch(error){
      setLoading(false);
      setError(error.message);
    }
   
   

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-xl text-center font-serif py-7'>Sign-up</h1>
      <form onSubmit= { handleSubmit }className='flex flex-col gap-4'> 
        <input type='text' placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type='text' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type='text' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading } className='bg-slate-700 uppercase p-3
         text-white rounded-lg
         
        hover:opacity-95 disabled:opacity-80'>
            {loading ? 'loading...' : 'Sign up'}
          
          </button>
          <OAuth />
      </form>
      <div className='flex gap-2 p-2' >
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-700'> sign-in</span>
        </Link>
      </div>
     


    </div>
  )
}

export default Signup
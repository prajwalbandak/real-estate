import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInstart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const Signin = () => {
  const[formData, setFormData] = useState({});
  // const[error, setError ] = useState('');
  // const[loading, setLoading] = useState(false);
  const { loading, error} = useSelector((state) => state.user);
const navigate = useNavigate(); 
const dispatch = useDispatch();
  const handleChange = (e) =>{
      setFormData({
        ...formData, //spread operator hold the old data;
        [e.target.id] : e.target.value 
      })
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      //setLoading(true);
      dispatch(signInstart());
      const response = await fetch('/api/auth/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Use lowercase 'application'
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
  
      if(data.success == false){
        // setError(data.message);
        // setLoading(false);
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      // setLoading(false);
      // setError(null);
      navigate('/');
      }catch(error){
        dispatch(signInFailure(error.message));
      // setLoading(false);
      // setError(error.message);
    }
   
   

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-xl text-center font-serif py-7'>Sign-In</h1>
      <form onSubmit= { handleSubmit } className='flex flex-col gap-4'> 
        
        <input type='text' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type='text' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading } className='bg-slate-700 uppercase p-3
         text-white rounded-lg
         
        hover:opacity-95 disabled:opacity-80'>
            {loading ? 'loading...' : 'Sign up'}
          
          </button>
          <OAuth/>
      </form>
      <div className='flex gap-2 p-2' >
        <p>Dont Have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700'> sign-Up</span>
        </Link>
      </div>
     


    </div>
  )
}

export default Signin
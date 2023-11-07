import React, { useState ,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


const Profile = () => {
  //const currentUser = useSelector((state) => state.user);
  const { currentUser} = useSelector(state=> state.user);
  const [file, setFile] = useState(undefined);
  const [ formData, setFormData] = useState({});
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const fileref = useRef(null);
  //console.log(currentUser);
  const dispatch = useDispatch();

  console.log("form data " + formData);
  console.log("file percentage "  + filePerc);
  console.log("errorHandere " + fileUploadError);
  useEffect (() =>{
    
    if(file){
      hanadleFileUpload(file);
    }
  },[file])

  const hanadleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const StorageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(StorageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress));
        },
        (error) => {
          setFileUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setFormData({ ...formData, avatar: downloadURL })
          );
        }
      );
    };

    const handleSubmit = async(e) =>{

      e.preventDefault();
      try{
        
      }catch(error){
        dispatch(updateUserFailure(error));
      }
      const response = await fetch("/api/user/update/:id",{

      })
      
    }
    const handleChange = (e) =>{
      setFormData({...formData, [e.target.id] : e.target.value});

    }


  
  return (

    <div className='p-3 max-w-lg mx-auto gap-4'>
      <h1 className='text-3xl text-center py-7 font-semibold '> Profile</h1>
      <form className='flex flex-col gap-3'> 
      <form className='flex flex-col gap-3'> 
      <input  ref={fileref} onChange= {(e) => setFile(e.target.files[0])} type="file" hidden accept='images/*'></input>
      
       
        <img 
              onClick= {() => {fileref.current.click() }}
              className='h-24 w-24  cursor-pointer rounded-full self-center object-cover'src={currentUser.rest.avatar} alt='profile' />
          </form>
        <input type='text' onChange= { handleChange } placeholder='userName' id='username'
        className='rounded-lg p-3 border gap-2'></input> 
      

        <input type='text' onChange= { handleChange }  placeholder='email' id='email' className='rounded-lg p-3 border gap-2'></input> 
        <input type='password' onChange= { handleChange }  placeholder='password' id='password' className='rounded-lg p-3 border gap-2'></input> 
        <button 
          onSubmit={handleSubmit}
        className='bg-slate-700
         text-white rounded-lg uppercase 
         hover:opacity-90 
         disabled:opacity-70 p-3' 
         >       update
         </button>
      </form>
      <div className='text-red-700 justify-between flex mt-3'>
      <span>delete account</span>
      <span>Sign out</span>

      </div>
    
    </div>
  )
}

export default Profile
import React, { useState ,useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { updateUserStart,
   updateUserSuccess,
    updateUserFailure ,
     deleteUserStart, signOutUserStart, signOutUserFailure, signOutUserSuccess,
     deleteUserSuccess, 
     deleteUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';


const Profile = () => {
  //const currentUser = useSelector((state) => state.user);
  const { currentUser,loading, error } = useSelector(state=> state.user);
  const [file, setFile] = useState(undefined);
  const fileRef = useRef(null);
  const [ formData, setFormData] = useState({});
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  //console.log("current User", currentUser);
  //console.log("curr", currentUser.data._id)
  //console.log("the user listing " + userListings[0]._id);
  const dispatch = useDispatch();


  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
        console.log("progres" + progress);
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
      console.log("formData ", formData);
    
      e.preventDefault();
      try{
        dispatch(updateUserStart())
        const response = await fetch(`/api/user/update/${currentUser.data._id}`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',

          },
         
          body: JSON.stringify(formData),
        })
        const data = await response.json();
      
        if(data.success === false){
          dispatch(updateUserFailure(data.message));
          return;
        }
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
        
      }catch(error){
        dispatch(updateUserFailure(error.message));
      }
      
      
    }

    const handleDeleteUser = async () => {
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    };

    const handleSignout = async(e) =>{
      try{
          dispatch(signOutUserStart())
          const response = await fetch("/api/auth/signOut");
          const data = response.json();
          if(data.success === false){
            dispatch(signOutUserFailure(data.message));
            return;

          }
          dispatch(signOutUserSuccess(data));

      }catch(error){
       dispatch(signOutUserFailure(error.message));
        
      }
    } 

  
    const handleChange = (e) =>{
      setFormData({...formData, [e.target.id] : e.target.value});

    }

    const handleUserListing = async(e) =>{
      try{
          setShowListingsError(false);
          const res = await fetch(`/api/listings/${currentUser.data._id}`);
          const data = await res.json();
          if(data.success  === false){
            setShowListingsError(true)
            return;
          }
          
          setUserListings(data);

      }catch(error){
        setShowListingsError(true);
      }
    }

    const handleListingDelete = async(listingId) =>{
      try{
          const deletedList = await fetch(`/api/deleteListing/${listingId}`,{
            method:'DELETE',

          }
          )
          const data = await deletedList.json();
          if(data.success === false){
            console.log(data.message);
            return;
          }

          setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))

      }catch(error){
       console.log(error.message);
      }
}
  
  return (

    <div className='p-3 max-w-lg mx-auto gap-4'>
      <h1 className='text-3xl text-center py-7 font-semibold '> Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'> 
      <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
      <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>



        <input type='text'
        defaultValue={currentUser.username}
        onChange= { handleChange } placeholder='userName' id='username'
              className='rounded-lg p-3 border gap-2'></input> 
      

        <input type='text'
         onChange= { handleChange }  
        defaultValue={currentUser.username} 
        placeholder='email' id='email' className='rounded-lg p-3 border gap-2'></input> 


        <input type='password' 
        onChange= { handleChange }  
        placeholder='password' id='password' 
        className='rounded-lg p-3 border gap-2'>
          </input> 
          <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link to='/create-listing' className='bg-green-500 hover:opacity-95 cursor-pointer text-center uppercase rounded-lg p-3'> 
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span  onClick= {handleSignout}  className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>
      <p className='text-red-700 mt-4'>{error ? error :"" }</p>
     
      <p className='text-blue-700 mt-4'>{updateSuccess ? "you have updated the user details successfully" :"" }</p>
   
    <button  onClick={handleUserListing } className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>SHOW LISTING</button>
        
    <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile
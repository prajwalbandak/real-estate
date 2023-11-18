import React, { useState } from 'react'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateListing = () => {
  const[files, setFiles ] = useState([]);
  const[imageUploadError, setImageUploadError] = useState(false);
  const[uploading, setUploading] = useState(false);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  console.log("CURRENTUSER", currentUser.data._id);
  const navigate = useNavigate();

  const[formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,

  });
  console.log("formData ", formData );


const handleImageSubmit = (e) => {
  setUploading(true)
  if (files.length > 0 && files.length + formData.imageUrls.length < 7 && formData.imageUrls.length <7) {
    setImageUploadError(false);
    const promises = [];

    for (let i = 0; i < files.length; i++) {
      promises.push(storeImage(files[i]));
    }
    Promise.all(promises)
      .then((urls) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false)
        
      })
      .catch((err) => {
        setImageUploadError('Image upload failed (2 mb max per image)');
        
      });
  } else {
    setImageUploadError('You can only upload 6 images per listing');
  
  }
};

const handleDeleteImage = (index) => {
  setFormData({
    ...formData,
    imageUrls: formData.imageUrls.filter((_, i) => i !== index),
  });
};

const storeImage   = (file) =>{
  return new Promise((resolve, reject) =>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    console.log("StorageRef" + storageRef);
    console.log("filenae" + fileName);
    console.log("storage" + storage);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) =>{
        const progress = 
          (snapshot.bytesTransferred /snapshot.totalBytes) * 100;
          console.log(`upload is ${progress}% done`);

      },
      (error) =>{
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
          resolve(downloadURL);
        });
      }
    )
  })
}

const handleChange = (e) => {
  if (e.target.id === 'sale' || e.target.id === 'rent') {
    setFormData({
      ...formData,
      type: e.target.id,
    });
  }

  if (
    e.target.id === 'parking' ||
    e.target.id === 'furnished' ||
    e.target.id === 'offer'
  ) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.checked,
    });
  }

  if (
    e.target.type === 'number' ||
    e.target.type === 'text' ||
    e.target.type === 'textarea'
  ) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
};

const handleSubmit = async(e) =>{
  e.preventDefault();
  if(formData.imageUrls.length < 1){
    setError("you must upload atleast one image");
  }
  if(+formData.discountPrice > +formData.regularPrice){
    setError("Discount price must be lesser than regular price");
  }
  try{
    setLoading(true);
    setError(false);

    const result = await fetch('api/listing/create', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        ...formData,
        userRef: currentUser.data._id
      })

    })
    const data  = await result.json();
    console.log("data" + data);
    console.log("data id" + data.listing._id);
    if(data.success === false){
      setError(error.message);
    }
    navigate(`/listing/${data.listing._id}`);

    setLoading(false);
  }catch(error){
    setError(error.message);
    setLoading(false)
  }
}

  
  return (
    <main className='max-w-4xl p-3 mx-auto'>
      <h1 className='text-3xl text-center bg-transparent font-semibold my-6'> Create Listing</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 sm:flex-row'>
          <div className='flex flex-col gap-4 flex-1'>
            <input onChange={handleChange}
            value={formData.name} className='border rounded-lg p-3 ' maxLength={40}  id="name" required placeholder='name'></input>
             <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />

<input
            type='text'
            placeholder='Address'
            className='border p-3 rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
           <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>($ / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>

                  {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                </div>
              </div>
            )}

          </div>
          </div>
          <div className='flex flex-col gap-4 flex-1'>
            <div>
              <span className='font-semibold text-center'>Images: </span>
              <span className='ml-2 text-center'>The first image will be the cover max(6) </span>
            </div>
            <div className='flex gap-4'>
              <input 
              disabled={uploading}
              onChange={(e) => setFiles(e.target.files)} type='file' id='images' accept='/images/*' multiple />
              <button type="button"  onClick= {handleImageSubmit} className="text-white bg-blue-700
               hover:bg-blue-800 focus:outline-none focus:ring-4
                focus:ring-blue-300 font-medium rounded-full text-center cursor-pointer
                text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {uploading ? "UPLOADING": "UPLOAD"}
                  </button>
            </div>
            <p className='text-red-700 text-sm'>
            {imageUploadError && imageUploadError}
          </p>

          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div key={url} className='flex justify-between p-3 items-center'> 
                <img
                  src={url}
                  alt='listing image'
                  className='w-20 h-20 object-contain rounded-lg '
                />
                <button type='button' onClick = {() => handleDeleteImage(index)} className='text-red-700 uppercase p-3 hover:opacity-60'>Delete</button>
                </div>
            ))}




            <button
              disabled={loading || uploading} 
            className="text-white bg-gradient-to-r
           from-purple-500 via-purple-600 to-purple-700 
           hover:bg-gradient-to-br 
           focus:ring-4 focus:outline-none focus:ring-purple-300
            dark:focus:ring-purple-800 shadow-lg
             shadow-purple-500/50 dark:shadow-lg
           dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            {loading ? "Creating " : "Create Listing" } 
            
            </button>
            {error && <p className='text-red-700 text-sm'>{error}</p>}

               
              
              
          </div>
        
        
        </form>

    </main>
  )
}

export default CreateListing
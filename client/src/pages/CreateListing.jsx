import React, { useState } from 'react'

const CreateListing = () => {
  const[files, setFiles ] = useState([]);

  const[formData, setFormData] = useState({
    imageUrls:[],

  });




  
  
  console.log("files" + files);
  return (
    <main className='max-w-4xl p-3 mx-auto'>
      <h1 className='text-3xl text-center bg-transparent font-semibold my-6'> Create Listing</h1>
        <form className='flex flex-col gap-3 sm:flex-row'>
          <div className='flex flex-col gap-4 flex-1'>
            <input className='border rounded-lg p-3 text-center' maxLength={40}  id="name" required placeholder='name'></input>
            <textarea className='border rounded-lg p-3  text-center '   id="Description " required placeholder='Description'></textarea>
            <textarea className='border rounded-lg p-3  text-center'  id="Address" required placeholder='Address'></textarea>
           

          <div className='flex gap-3 justify-between flex-wrap'>
            <div className='flex gap-2'>
            <input
                type='checkbox'
                id='sale'
                className='w-5'
                
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
            <input
                type='checkbox'
                id='sale'
                className='w-5'
                
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
            <input
                type='checkbox'
                id='sale'
                className='w-5'
                
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
            <input
                type='checkbox'
                id='sale'
                className='w-5'
                
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
            <input
                type='checkbox'
                id='sale'
                className='w-5'
                
              />
              <span>Others</span>
            </div>
            <div className='flex gap-2'>
            <input
                type='checkbox'
                id='sale'
                className='w-5'
                
              />
              <span>Sell</span>
            </div>
          </div>
          <div  className='flex flex-wrap gap-6' >
            <div className='flex items-center gap-2 '>
               <input className="border p-3 gap-2 rounded-lg  " type='number' id='bathrooms' defaultChecked='1' min='1' max='10' required />
              <span>Beds</span>
            </div>
            <div className='flex items-center gap-2 '>
              <input className="border p-3 gap-2 rounded-lg  " type='number' id='bathrooms' defaultChecked='1' min='1' max='10' required />
              <span>Bathrooms</span>
            </div>
            <div className='flex items-center gap-2'>
              <input className="border p-3 gap-2 rounded-lg  " type='number' id='RegularPrice' defaultChecked='1' min='1' max='10' required />
              <span>Regular Price</span>
              <span>($/month)</span>
            </div>
            <div className=''>
              <input className="border p-3 gap-2 rounded-lg  " type='number' id='discountPrice' defaultChecked='1' min='1' max='10' required />
              <span>Discount Price </span>
              <span>($/month)</span>
            </div>
          </div>
          </div>
          <div className='flex flex-col gap-4 flex-1'>
            <div>
              <span className='font-semibold text-center'>Images: </span>
              <span className='ml-2 text-center'>The first image will be the cover max(6) </span>
            </div>
            <div className='flex gap-4'>
              <input onChange={(e) => setFiles(e.target.files)} type='file' id='images' accept='/images/*' multiple />
              <button type="button"  className="text-white bg-blue-700
               hover:bg-blue-800 focus:outline-none focus:ring-4
                focus:ring-blue-300 font-medium rounded-full text-center cursor-pointer
                text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">UPLOAD</button>







            </div>
            <button   className="text-white bg-gradient-to-r
           from-purple-500 via-purple-600 to-purple-700 
           hover:bg-gradient-to-br 
           focus:ring-4 focus:outline-none focus:ring-purple-300
            dark:focus:ring-purple-800 shadow-lg
             shadow-purple-500/50 dark:shadow-lg
           dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Create Listing</button>

          </div>
        
        </form>

    </main>
  )
}

export default CreateListing
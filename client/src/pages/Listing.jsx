import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
    const[listing , setListing] = useState(null);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(false);
    const params  = useParams();
    SwiperCore.use([Navigation]);

useEffect(() =>{
    const fetchListing = async() =>{
        setLoading(true);
        try{
            const result = await fetch(`/api/getListingForUser/${params.listingId}`)
            const data = await result.json();

            if(data.success == false){
                setError(data.message);
                setLoading(false);
            }
            setListing(data);
            setLoading(false);

        }catch(error){
            setError(error.message);
            setLoading(false);
        }
    }
    fetchListing();
},[params.listingId])

  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}

      {listing && !loading && !error && (
        <div>
             <Swiper navigation>
                {listing.imageUrls.map((url ) => (
                     <SwiperSlide key={url}>
                   <div
                   className='h-[550px]'
                   style={{
                     background: `url(${url}) center `,
                     backgroundSize: 'cover',
                   }}
                 ></div>
                 </SwiperSlide>
                ))}

             </Swiper>
        </div>
      )}



            {/* {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          </div> */}

    </main>


   
  )
}

export default Listing
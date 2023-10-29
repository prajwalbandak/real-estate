// import React from 'react';
// import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
// import { app } from '../../firebase';
// import { useDispatch } from "react-redux";
// import { signInSuccess } from "../redux/user/userSlice";
// // const OAuth = () => {
//     const dispatch = useDispatch();

//     const handleGoogleClick = async() => {
//         try {
//             const provider = new GoogleAuthProvider();
//             const auth = getAuth(app);
//             const result = await signInWithPopup(auth, provider);
                // const result= await fetch('/api/auth/goggle', {
                //     method:POST,
                //     headers:{
                //         'Content-Type':'application/json',
                //     },
                //     body:JSON.stringify({name:result.user.displayName, email:result.user.email, photo:result.user.photoURL})
                    

                // })
                // const data = result.json();
                // dispatch(signInSuccess(res));

//             console.log(result);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-center text-white p-3 rounded-lg'>
//             Continue with Google
//         </button>
//     );
// };

// export default OAuth;

import React from 'react'

const OAuth = () => {
  return (
    <div>OAuth</div>
  )
}

export default OAuth

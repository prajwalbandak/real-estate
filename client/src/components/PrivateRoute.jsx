import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const privateRoute = () => {
const {currentUser}  = useSelector((state) => state.user);
//console.log("currentUser" + currentUser);
  return currentUser ? <Outlet /> : <Navigate to='/sign-in' ></Navigate>
}

export default privateRoute;
import React, { useContext, useState } from 'react'
import { Context } from '../main';
import Loader from '../components/Loader.jsx';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';


const Profile=()=> {
  
  const {isAuthenticated,loading,user} = useContext(Context);
  const [refresh,setRefresh] = useState(false);

  useEffect(()=>{
    setRefresh(prev=>!prev);
  },[refresh]);

  // console.log(user);
  if(!isAuthenticated) return <Navigate to={"/login"} />

  return (
    loading ? <Loader/> :(
      <div>
        <h1 className='text-2xl font-bold'>Name : {user?.name}</h1>
        <p>Email : {user?.email}</p>
      </div>
    )
  );
};

export default Profile;
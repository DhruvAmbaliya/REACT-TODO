import React, { useContext, useState } from 'react'
import { Context, server } from '../main';
import Loader from '../components/Loader.jsx';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const Profile=()=> {
  
  const {isAuthenticated,loading,user} = useContext(Context);
  const {setUser,setIsAuthenticated,setLoading}= useContext(Context);
  const [refresh,setRefresh] = useState(false);

  useEffect(()=>{
    setLoading(true);
    setRefresh(prev=>!prev);
    axios.get(`${server}/users/me`,
    {
      withCredentials:true,
    }).then((res)=>{
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }).catch((error)=>{
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    });
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
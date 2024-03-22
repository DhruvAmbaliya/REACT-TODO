import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main';
import Loader from '../components/Loader.jsx';
import { Navigate } from 'react-router-dom';
import axios from 'axios';


const Profile=()=> {
  
  const {isAuthenticated,loading,user} = useContext(Context);
  const {setUser,setIsAuthenticated,setLoading}= useContext(Context);
  const [refresh,setRefresh] = useState(false);

  useEffect(()=>{
    setLoading(true);
    axios.get(`${server}/users/me`,
    {
      withCredentials:true,
    }).then((res)=>{
      setRefresh(prev=>!prev);
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    }).catch((error)=>{
      setRefresh(prev=>!prev);
      setUser({});
      setIsAuthenticated(false);
      setLoading(false);
    });
  },[]);

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
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import axios from 'axios';

function Login() {

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const { isAuthenticated , setIsAuthenticated,loading,setLoading} = useContext(Context);

  const submitHandler = async (e)=>{
    e.preventDefault();
    setLoading(true);
   try {
    // console.log(email,password);
    const {data} =  await axios.post(`${server}/users/login`,
    {
      email,password
    },{
      headers:{
        "Content-Type":"application/json",
      },
      withCredentials:true,
    }
    );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
   } 
   catch (error) {
    toast.error(error.response.data.message);
    // console.log(error);
    setIsAuthenticated(false);
    setLoading(false);
   }
  };

  if(isAuthenticated) {
        return <Navigate to={"/"} />
  } else{
     <Navigate to={"/login"} />
  }

  return (
    <div >
    <section>
        <form onSubmit={submitHandler} className='flex flex-col text-xl uppercase font-normal'>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} required type='email' placeholder='Email' className='text-center mt-5'/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} required type='password' placeholder='Password' className='text-center mt-2'/>
            <button disabled={loading} type='submit' className='text-xl uppercase font-normal mt-2'>Login</button>
            <h4 className='text-center mt-2'>Or</h4>
            <Link to="/register" className='text-xl uppercase font-normal text-center mt-2'>Sign Up</Link>
        </form>
    </section>
    </div>
  )
}

export default Login
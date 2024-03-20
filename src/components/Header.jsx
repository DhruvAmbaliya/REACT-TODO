import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import toast from 'react-hot-toast';
import axios from 'axios';

function Header() {

  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);

  const logoutHandler = async ()=>{
    setLoading(true);
   try {
    await axios.get(`${server}/users/logout`,
    {
      withCredentials:true,
    });

      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
   } 
   catch (error) {
    toast.error(error.response.data.message);
    // console.log(error);
    setIsAuthenticated(true);
    setLoading(false);
   }
  };

  return (
    <nav className='bg-black flex align-middle justify-between py-0 px-12 w-full z-50 h-10'>
        <div className='font-normal uppercase text-white'>
            <h2 className='mt-2'>Todo App</h2>
        </div>
        <article className='flex items-center text-center text-white mx-4'>
            <Link to={"/"} className='mx-4 hover:bg-white hover:text-black'>Home</Link>
            <Link to={"/profile"} className='mx-4 hover:bg-white hover:text-black'>Profile</Link>
            {
              isAuthenticated? ( <button disabled={loading} onClick={logoutHandler} className='mx-4 hover:bg-white hover:text-black'>Logout</button>) : 
              (<Link to={"/login"} className='mx-4 hover:bg-white hover:text-black'>Login</Link>)
            }
           
        </article>
    </nav>

  )
}

export default Header
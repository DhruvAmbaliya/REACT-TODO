import React, { useContext } from 'react'
import { Context } from '../main';
import Loader from '../components/Loader.jsx';

const Profile=()=> {
  const {isAuthenticated,loading,user} = useContext(Context);
  console.log(user);
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
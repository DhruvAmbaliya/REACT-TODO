import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import TodoItem from '../components/TodoItem';
import { Navigate } from 'react-router-dom';


function Home() {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [loading,setLoading] = useState(false);
  const [tasks,setTasks] = useState([]);
  const [refresh,setRefresh] = useState(false);

  const {isAuthenticated} = useContext(Context);

  const submitHandler = async(e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const {data} = await axios.post(`${server}/task/new`,{
      title,description
    },{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
    );
    toast.success(data.message);
    setLoading(false);
    setRefresh(prev=>!prev);

    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  const updateHandler = async(id)=>{
    try {
      const {data} = await axios.put(`${server}/task/${id}`,{},{
        withCredentials:true,
      });
      toast.success(data.message);
      setRefresh(prev=>!prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  
  const deleteHandler = async(id)=>{
    try {
      const {data} = await axios.delete(`${server}/task/${id}`,{
        withCredentials:true,
      });
      // console.log(data.message)
      toast.success(data.message);
      setRefresh(prev=>!prev);
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message);
    }
  }

  useEffect(()=>{
    axios.get(`${server}/task/my`,{
      withCredentials:true,
    }).then((res)=>{
      // console.log(res.data.tasks);
      setTasks(res.data.tasks);
    }).catch((e)=>{
      toast.error(e.response.data.message);
      // toast.error("Login First"); 
    });
  },[refresh]);

  if(!isAuthenticated) return <Navigate to={"/login"} />

  return (
    <div>
    <section>
      <form className='mt-5 ml-5' onSubmit={submitHandler}>
      <input className='border-4 border-black-500/100' type='text' placeholder='Title' required value={title} onChange={(e)=>setTitle(e.target.value)} />
      <input className='border-4 border-black-500/100 ml-2' type='text' placeholder='Description' required value={description} onChange={(e)=>setDescription(e.target.value)} />
      <button disabled={loading} className='border-4 border-slate-300 hover:border-indigo-300 ml-2' type='submit'>Add Task</button>
      </form>
    </section>
    <section >
    { tasks.map((i)=>(
      <TodoItem
      title={i.title} 
      description={i.description} 
      isCompleted={i.isCompleted} 
      createdAt={i.createdAt}
      updateHandler={updateHandler}  
      deleteHandler={deleteHandler}
      id={i._id}
      key={i._id}
      />
      ))
    }
    </section>
    </div>
  )
}

export default Home;
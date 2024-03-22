import { BrowserRouter,Link,Navigate,Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import { Toaster } from "react-hot-toast"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Context, server } from "./main"
import Footer from "./components/Footer"

function App() {

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
  


  return <BrowserRouter>
  <Header/>
    <Routes>
      <Route path='*' element={<Login />}/>
      {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/register" element={<Register/>}/> 
    </Routes>
    <Footer/>
    <Toaster/>
  </BrowserRouter> 
}

export default App

import React,{useEffect, useState} from 'react';
import SignUp from './SignUp';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ToDo from './ToDo';
import LogIn from './Login';
import NavBar from './NavBar';
import axios from "axios"
const App = () => {
  const [userAuth,setUserAuth]= useState(null)


  useEffect(()=>{
    let user = localStorage.getItem("user")
    user = JSON.parse(user)
    axios.defaults.headers.common['Authorization'] = "Bearer "+user.token
    setUserAuth(user)
  },[])
    return (
        <div>
            <BrowserRouter>

            <NavBar userAuth={userAuth} setUserAuth={setUserAuth}/>
            <Routes>
            
                <Route 
                path='/'

                element={userAuth ?<ToDo userAuth={userAuth}/>:<Navigate to="/login"/>}
                />
                <Route 
                path='/signup'
                element={!userAuth?<SignUp setUserAuth={setUserAuth}/>:<Navigate to="/"/>}
                />
                <Route 
                path='/login'
                element={userAuth?<Navigate to="/"/>:<LogIn setUserAuth={setUserAuth}/>}
                />
            </Routes>

            </BrowserRouter>
      
        </div>
    );
}

export default App;

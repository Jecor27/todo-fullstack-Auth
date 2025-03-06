import React from 'react';
import SignUp from './SignUp';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ToDo from './ToDo';
import LogIn from './Login';

const App = () => {
    return (
        <div>
            <BrowserRouter>
            <Routes>
            
                <Route 
                path='/'
                element={<ToDo/>}
                />
                <Route 
                path='/signup'
                element={<SignUp/>}
                />
                <Route 
                path='/login'
                element={<LogIn/>}
                />
            </Routes>
            </BrowserRouter>
            {/* <SignUp/> */}
        </div>
    );
}

export default App;

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({userAuth,setUserAuth}) => {
    const logOut=()=>{
        setUserAuth(null)
        localStorage.setItem("user",null)
    }
    return (
        <div>
            <h1>NavBar, hello {userAuth?.email}</h1>
            {userAuth ?<>
            <Link to="/">Home</Link>
<button onClick={logOut}>logout</button>

            </>:<>
<Link to="/signup">Sign Up</Link>
<Link to="/login">Log In</Link>

            </>}
        </div>
    );
}

export default NavBar;

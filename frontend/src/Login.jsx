import React,{useState} from 'react';
import axios from "axios"
const LogIn = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()
        let data={
            email,
           password
        }
        let url = import.meta.env.VITE_API // http://localhost:8080

        try {
            
            let response = await axios.post(url+"/api/login",data)
             console.log(response)
        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error:", error)
            
        }
    }
    return (
        <div>
            <h1>Login </h1>
          
          <form onSubmit={handleSubmit}>

            <label htmlFor="">
                email
                <input type="email"  name="" id="" onChange={(e)=>setEmail(e.target.value)}/>
            </label>
<br/>
            <label htmlFor="">
                password
                <input type="text" name="" id="" onChange={(e)=>setPassword(e.target.value)}/>
            </label>
            <button >Log In</button>
          </form>
        </div>
    );
}

export default LogIn;

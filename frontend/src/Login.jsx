import React,{useState} from 'react';
import axios from "axios"
const LogIn = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const [loading,setLoading]=useState(false)
    const [success,setSuccess]=useState(false)
    const [error,setError]= useState("")
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(loading) {
            console.log("a request is happening")
            return
        }
        console.log("new request")
        setLoading(true)
        setSuccess(false)
        setError("")
        let data={
            email,
           password
        }
        let url = import.meta.env.VITE_API // http://localhost:8080
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            let response = await axios.post(url+"/api/login",data)
            
            console.log(response)
            setSuccess(true)
            } catch (error) {
                console.log("🚀 ~ handleSubmit ~ error:", error)
                setError(error.response.data.error)
                
            }
            setLoading(false)
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
                <input  type="text" name="" id="" onChange={(e)=>setPassword(e.target.value)}/>
            </label>
            <button >Log In</button>
            {loading&&<h5>loading</h5>}
            {error&&<h5>{error}</h5>}
            {success &&<h5>You are in</h5>}
          </form>
        </div>
    );
}

export default LogIn;

import React,{useState} from 'react';

const SignUp = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(email,password)
    }
    return (
        <div>
            <h1>Sign Up</h1>
          
          <form onSubmit={handleSubmit}>

            <label htmlFor="">
                email
                <input type="email" required name="" id="" onChange={(e)=>setEmail(e.target.value)}/>
            </label>
<br/>
            <label htmlFor="">
                password
                <input type="text" name="" id="" onChange={(e)=>setPassword(e.target.value)}/>
            </label>
            <button >sign up</button>
          </form>
        </div>
    );
}

export default SignUp;

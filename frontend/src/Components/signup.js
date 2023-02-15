import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './Css/signup.css';

const Signup = () => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if(auth){
      navigate('/')
    }
  },[]) 
  

    const collData = async ()=>{
        console.warn(name, email, password)
        let result = await fetch("http://localhost:5000/register", {
          method: 'post',
          body: JSON.stringify({name, email, password}),
          headers:{
            'Content-Type' : 'application/json'
          }
        })
        result = await result.json()
        console.log(result)
        if(result){
          localStorage.setItem("user",JSON.stringify(result.result));
          localStorage.setItem("token",JSON.stringify(result.auth));
          navigate('/');
        }
    }


  return (
    <div className='register'>
        <h1>Register</h1>
        <input className='inputbox' placeholder='Enter Name' type='text' value={name} onChange={(e)=>setName(e.target.value)}/>

        <input className='inputbox' placeholder='Enter Email' type='text' value={email} onChange={(e)=>setEmail(e.target.value)}/>

        <input className='inputbox' placeholder='Enter Password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

        <button onClick={collData} type='button' className='signup-btn'>Register</button>
    </div>
  )
}

export default Signup;

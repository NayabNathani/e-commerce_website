import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './Css/login.css';
const Login = ()=>{
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const auth = localStorage.getItem("user");
        if(auth){
            navigate('/')
        }
    }, [])
    
    const handleLogin = async()=>{
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({email, password}),
            headers:{
              'Content-Type' : 'application/json'
            }
        });
        result = await result.json();
        console.log(result)
        if(result.name){
            localStorage.setItem("user",JSON.stringify(result));
            navigate('/ ')
        }else{
            alert("Enter Correct Detail!!!");
        }
    }

    return(
        <div className='login'>
        <h1 className='loginText'>Login</h1>
        <input className='inputbox' placeholder='Enter Email' type='text' onChange={(e)=>setEmail(e.target.value)} value={email}/>

        <input className='inputbox' placeholder='Enter Password' type='password' onChange={(e)=>setPassword(e.target.value)} value={password}/>

        <button type='button' className='signup-btn' onClick={handleLogin}>Login</button>
    </div>

    )
}

export default Login;
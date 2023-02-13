import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./Assests/logo.png";
import './Css/navbar.css'

const Nav = ()=>{
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate('/signup');
    }

    return(
        <div>
        <img src={logo} alt='' className="logo"/>
        {auth?
            <ul className="nav-ul">
                
                <li><Link to='/'>Products</Link></li>
                <li><Link to='/add'>Add Product</Link></li>
                <li><Link to='/update'>Update Product</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link onClick={logout} to='/signup'>Logout</Link></li>
                {/* <li className="userWelcome">Hello {JSON.parse(auth).name}</li> */}
            </ul>
            :
            <ul className="nav-ul nav-right">
            <li><Link to='/signup'>Signup</Link></li>
            <li><Link to='/login'>Login</Link></li>
            </ul>
        }

        </div>

    )
}

export default Nav;
import React from 'react'
import './Login.css'

function Login() {
  return (
    <div className='main-container'>
        {/* <h2 className='Head'>Bookish-Treasure</h2> */}
        <div className='Containers'>
            <img src='images/login-cover2.jpeg' alt='' className='login-cover'/>
            <div className='right-container'>
                <h3>Login</h3>
                <input className='Username' placeholder='UserName' name='Username'></input>
                <input className='Password' placeholder='Password' name='Password' type='password'></input>
                <button className='log-btn'>Sign In</button>
                <a href='' className='fp'>Forget Password / Contact Us</a>
                <button className='sign-up'>SignUp</button>
            </div>
        </div>
      
    </div>
  )
}

export default Login

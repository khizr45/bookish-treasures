import React from 'react'
import './Register.css'
import { Header } from './Login'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [UN,setUN] = useState("");
    const [Pass,setPass] = useState("");
    const [Fname , setFname] = useState("");
    const [Pass2,setPass2] = useState("");
    const [Email,setEmail] = useState("");
    const [Pno,setPno] = useState("");
    const [Address,setAddress] = useState("")
    async function Authorize(){
        if(UN===""||Pass===""||Pass2===""||Fname===""||Email===""||Pno===""||Address===""){
            toast.error("Please Complete The form",{
                position:toast.POSITION.TOP_RIGHT,
            })
        }else{
            if(Pass !== Pass2){
                toast.error("Both Passwords donot match",{
                    position:toast.POSITION.TOP_RIGHT,
                })
            }else{
                if(Pass.length <=8){
                    toast.warning("Password must be atlease 8 characters",{
                        position:toast.POSITION.TOP_RIGHT,
                    })
                }else{
                    const response = await fetch("http://127.0.0.1:8000/auth/User",{
                        method:'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({UN,Pass})
                    });
                    const data = await response.json();
                    if(data.length > 0){
                        toast.warning("Username already taken",{
                            position:toast.POSITION.TOP_RIGHT,
                        })
                    }else{
                        const response = await fetch("http://127.0.0.1:8000/user/register",{
                            method:'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({UN,Pass,Email,Pno,Address,Fname})
                        });
                        const data = await response.json();
                        if(data === "successfull"){
                            toast.success("User register successfully",{
                                position:toast.POSITION.TOP_RIGHT,
                            })
                            setTimeout(()=>{
                                navigate("/user/Login")
                            },3000)
                        }
                    }
                        
                }
            }
        }
    }
  return (
        <div className="main-con-register">
            <ToastContainer/>
            <Header/>
            <div className='containers-register'>
                <div className='Mid-register'>
                    <img src='/images/login-cover2.jpeg' className='Login-cover-register'/>
                    <div className='Right-Container-register'>
                        <h3>Register User</h3>
                        <input placeholder='Full Name' onChange={(e)=>{setFname(e.target.value)}}/>
                        <input placeholder='Username' onChange={(e)=>{setUN(e.target.value)}}/>
                        <input placeholder='Password' type='password' onChange={(e)=>{setPass(e.target.value)}}/>
                        <input placeholder='Reenter Password' type='password' onChange={(e)=>{setPass2(e.target.value)}}/>
                        <input placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
                        <input placeholder='Phone_number' onChange={(e)=>{setPno(e.target.value)}}/>
                        <input placeholder='address' onChange={(e)=>{setAddress(e.target.value)}}/>
                        <button onClick={Authorize}>Register</button>
                        <button className='back-log-btn' onClick={()=>{navigate("/user/Login")}}>Already Have Account</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Register
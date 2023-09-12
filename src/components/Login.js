import React,{useState} from 'react'
import './Login.css'

function Login() {
  const [Inputfield1,ChangeInputField1] = useState("UserName");
  const [Inputfield2,ChangeInputField2] = useState("Password");
  const [TypeInput,changeTypeInput] = useState("password");
  const [Show_btn,change_show_btn] = useState("Show");
  const [ElementClass, UpdateElementClass] = useState("Containers");
  const [ElementClass2, UpdateElementClass2] = useState("Containers hide");
  const[Input1,ChangeInput1] = useState("");
  function PassShow(){
    if(TypeInput === "password"){
        changeTypeInput("");
        change_show_btn("Hide"); 
    }else{
      changeTypeInput("password");
      change_show_btn("Show");
    }
  }
  function OpenSignUp(){
    UpdateElementClass("Containers hide")
    UpdateElementClass2("Containers");
  }
  function OpenLogIn(){
    UpdateElementClass("Containers");
    UpdateElementClass2("Containers hide");
  }
  return (
    <div className='main-container'>
        {/* <h2 className='Head'>Bookish-Treasure</h2> */}
        <div className={ElementClass}>
            <img src='images/login-cover2.jpeg' alt='' className='login-cover'/>
            <div className='right-container'>
                <h3>Login</h3>
                <input className='Username' placeholder={Inputfield1} name='Username'></input>
                <div className='Password-set'>
                  <input className='Password' placeholder={Inputfield2} name='Password' type={TypeInput}></input>
                  <button className='sp' onClick={PassShow}>{Show_btn}</button>
                </div>
                <button className='log-btn'>Sign In</button>
                <a href='' className='fp'>Forget Password / Contact Us</a>
                <button className='sign-up' onClick={OpenSignUp}>SignUp</button>
            </div>
        </div>
        <div className={ElementClass2}>
            <img src='images/login-cover2.jpeg' alt='' className='login-cover'/>
            <div className='right-container'>
                <h3>Sign Up</h3>
                <input className='FullName' placeholder='FullName'></input>
                <input className='Email' placeholder='Email'></input>
                <input className='Username' placeholder={Inputfield1} name='Username'></input>
                <div className='Password-set'>
                  <input className='Password' placeholder={Inputfield2} name='Password' type={TypeInput}></input>
                  <button className='sp' onClick={PassShow}>{Show_btn}</button>
                </div>
                <button className='log-btn' onClick={OpenLogIn}>Register</button>
            </div>
        </div>
    </div>
  )
}

export default Login

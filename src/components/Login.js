import React,{useState} from 'react'
import './Login.css'

function Login(props) {
  const [Inputfield1,ChangeInputField1] = useState("UserName");
  const [Inputfield2,ChangeInputField2] = useState("Password");
  const [TypeInput,changeTypeInput] = useState("password");
  const [Show_btn,change_show_btn] = useState("Show");
  const [ElementClass, UpdateElementClass] = useState("Containers");
  const [ElementClass2, UpdateElementClass2] = useState("Containers hide");
  const [SignBtn , SetSignBtn] = useState("log-btn disabled"); 
  const [chkUser , setUser] = useState("");
  const [chkPass , setPass] = useState("");
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

  function TakeUserName(e){
    setUser(e.target.value)
    if(chkPass != ""){
      SetSignBtn("log-btn")
    }else{
      SetSignBtn("log-btn disabled")
    }

    if(chkUser.length === 1){
      SetSignBtn("log-btn disabled")
    }
  }

  function TakePassword(e){
    setPass(e.target.value)
    if(chkUser != ""){
      SetSignBtn("log-btn")
    }else{
      SetSignBtn("log-btn disabled")
    }

    if(chkPass.length === 1){
      SetSignBtn("log-btn disabled")
    }
  }
  return (
    <div className={props.cName}>
        <Header/>
        <div className={ElementClass}>
           <div className='login-cover'>
            <img src='images/login-cover2.jpeg' alt='' />
            </div>
            <div className='right-container'>
                <h3>Login</h3>
                <input className='Username' placeholder={Inputfield1} name='Username' onChange={TakeUserName}></input>
                <div className='Password-set'>
                  <input className='Password' placeholder={Inputfield2} name='Password' type={TypeInput} onChange={TakePassword}></input>
                  <button className='sp' onClick={PassShow}>{Show_btn}</button>
                </div>
                <button className={SignBtn} onClick={()=>props.doHome(SignBtn)}>Sign In</button>
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
export const Header = ()=>{

  return <header>
    <div className='head-container'>
          <img src='images/logo_Login.jpg' className='Head' />
        </div>
  </header>

}

export default Login
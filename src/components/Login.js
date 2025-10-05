import React,{useState} from 'react';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useParams,useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { newUser } from '../app/features/Cart/CartSlice';

function Login() {
  const [IsLogin , setIsLogin] = useState(false)
  const navigate = useNavigate();
  const [UN , setUN] = useState("");
  const [Pass,setPass] = useState("");
  const dispatch = useDispatch();
  async function Authorize(){
    if(UN===""){
      toast.warning("Please Enter Username",{
        position:toast.POSITION.TOP_RIGHT,
      })
    }else if(Pass === ""){
      toast.warning("Please Enter Password",{
        position:toast.POSITION.TOP_RIGHT,
      })
    }else{
      const response = await fetch("https://bookish-treasures-backend.onrender.com/auth/User",{
          method:'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({UN,Pass})
      });
      const data =  await response.json();
      if(data.length > 0){
        if(Pass === data[0].password){
          setIsLogin(true);
          dispatch(newUser(UN));
          navigate('/');
        }else{
          toast.error("Incorrect Password",{
            position:toast.POSITION.TOP_RIGHT,
          })
        }
      }else{
        toast.error("UserName doesnot exsist",{
          position:toast.POSITION.TOP_RIGHT,
        })
      }
    }
  }
  return (
    <div className="main-container">
        <ToastContainer/>
        <Header/>
        <div className='containers' data-testid='login'>
            <div className='Mid'>
                <img src='/images/login-cover2.jpeg' className='Login-cover'/>
                <div className='Right-Container'>
                  <h3>User Login</h3>
                  <input placeholder='Username' onChange={(e)=>{setUN(e.target.value)}}/>
                  <input placeholder='Password' type='password' onChange={(e)=>{setPass(e.target.value)}}/>
                  <button onClick={Authorize}>Sign In</button>
                  <button onClick={()=>{navigate("/user/Register")}}>SignUp</button>
                </div>
            </div>
        </div>
    </div>
  )
}
export const Header = ()=>{

  return <header>
    <div className='head-container'>
          <img src='/images/logo_Login.jpg' className='Head' />
        </div>
  </header>

}

export default Login
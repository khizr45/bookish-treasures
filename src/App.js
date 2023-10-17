import React , {useState} from 'react'
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import BookPg from './components/BookPg';
function App() {
  const [showLogin, setShowLogin] = useState('hide')
  const [showHome , setShowHome] = useState('main-container')
  const [showBkPg , setPg] = useState("hide")
  const [src , setSrc] = useState("")
  const [title , setTitle] = useState("")
  const [author , setAuthor] = useState("")
  const [price, setPrice] = useState("")
  function ShowLogin(){
    setShowLogin('main-container');
    setShowHome('hide');
  }
  function ShowHome(check){
    if(check != "log-btn disabled"){
      setShowLogin('hide');
      setShowHome('main-container');
    }
  }

  function BkPg(Isrc , Ititle , Iauthor , Iprice){
    setShowHome("hide");
    setPg("main-con")
    setSrc(Isrc)
    setTitle(Ititle)
    setAuthor(Iauthor)
    setPrice(Iprice)
  }
  return (
    <div className="App">
      <Login cName = {showLogin} doHome = {ShowHome}/>
      <Home showLog={ShowLogin} cName = {showHome} BookPage = {BkPg}/>
      <BookPg cName = {showBkPg} source = {src} BkTitle = {title} BkAuthor = {author} BkPrice = "Rs: 520"/>
    </div>
  );
}

export default App;

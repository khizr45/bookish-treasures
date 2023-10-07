import React , {useState} from 'react'
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Cart from './components/Cart';
function App() {
  const [showLogin, setShowLogin] = useState('hide')
  const [showHome , setShowHome] = useState('main-container')
  function ShowLogin(){
    setShowLogin('main-container');
    setShowHome('hide');
  }
  function ShowHome(){
    setShowLogin('hide');
    setShowHome('main-container');
  }
  return (
    <div className="App">
      <Login cName = {showLogin} doHome = {ShowHome}/>
      <Home showLog={ShowLogin} cName = {showHome}/>
    </div>
  );
}

export default App;

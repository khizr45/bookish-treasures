import React,{useState , useEffect} from 'react'
import './Home.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Home() {
  return (
    <div className='main-container'>
      <div className='navBarDiv'>
        <NavBar />
      </div>
      <div className='OffersDiv'>
        <Offers />
      </div>
      <div className='new-div'></div>
    </div>
  )
}

export const NavBar = () => {
  const [DDMenuClass,UpdateDDMenu] = useState("hide")
  function OpenDDMenu(){
    UpdateDDMenu("DDMenu")
  }
  function CloseDDMenu(){
    UpdateDDMenu("hide");
  }
  return <navbar>
    <div className='nbar'>
      <button className='dd-btn' onMouseEnter={OpenDDMenu} onMouseLeave={CloseDDMenu} ><img src='images/logo_dd_menu.jpg' className='dd-logo'/></button>
      <input className='SearchBar' placeholder='Search'></input>
      <div className='nbarRight'>
        <button className='LogS-btn'>Login/SignUp</button>
        <button className='cart-btn'><img src='images/shop_cart_logo.png' className='cart-logo'/></button>
      </div>
      
    </div>
    <div className={DDMenuClass} onMouseEnter={OpenDDMenu} onMouseLeave={CloseDDMenu}>
      <button className='ddmenubtn'>hello</button><br />
      <button className='ddmenubtn'>hello</button><br />
      <button className='ddmenubtn'>hello</button><br />
      <button className='ddmenubtn'>hello</button><br />
      <button className='ddmenubtn'>hello</button><br />
      <button className='ddmenubtn'>hello</button><br />
      <button className='ddmenubtn'>hello</button><br />
      <button className='ddmenubtn'>hello</button><br />
      <button className='ddmenubtn'>hello</button><br />
      <button className='ddmenubtn'>hello</button><br />
      <button className='ddmenubtn'>hello</button><br />
      <button className='ddmenubtn'>hello</button>
    </div>
  </navbar>
}

export const Offers = () => {
  var offers = ['images/Offer1.jpg','images/Offer2.jpg','images/Offer3.jpg','images/Offer4.jpg']
  const [offerNow , setOfferNow] = useState(0)

  function NewOffer(){
      if(offerNow+1 === offers.length){
        setOfferNow(0)
      }else{
        setOfferNow(offerNow+1)
      }
  }
  return <offers>
    <div className='OffersMain'>
      <img src={offers[offerNow]} className='Offer' id='off'/>
      <button className='Slider-Btn' onClick={NewOffer}><ArrowForwardIcon fontSize='large' /></button>
    </div>
  </offers>
}

export default Home

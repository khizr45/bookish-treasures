import React,{useState , useEffect} from 'react'
import './Home.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function Home(props) {
  return (
    <div className={props.cName}>
      <div className='navBarDiv'>
        <NavBar LogPage = {props.showLog}/>
      </div>
      <div className='Sec-Nav'>
        <SecondaryNav />
      </div>
      <div className='OffersDiv'>
        <Offers />
      </div>
      <div className='Books'>
        <BookBox title='Charlie And the Chocolate Factory' 
        imageSrc = 'images/Charlie_and_the_Choclate_Factory.jpeg' 
        Author = 'Roald Dahl'/>
        <BookBox title='Harry Potter and the Deathly Hallows'
          Author = 'J. K. Rowling'
          imageSrc = 'images/Harry_Potter.png'
        />
        <BookBox title='Charlie And the Chocolate Factory' 
        imageSrc = 'images/Charlie_and_the_Choclate_Factory.jpeg' 
        Author = 'Roald Dahl'/>
        <BookBox title='Harry Potter and the Deathly Hallows'
          Author = 'J. K. Rowling'
          imageSrc = 'images/Harry_Potter.png'
        />
        <BookBox title='Charlie And the Chocolate Factory' 
        imageSrc = 'images/Charlie_and_the_Choclate_Factory.jpeg' 
        Author = 'Roald Dahl'/>
        <BookBox title='Harry Potter and the Deathly Hallows'
          Author = 'J. K. Rowling'
          imageSrc = 'images/Harry_Potter.png'
        />
        <BookBox title='Charlie And the Chocolate Factory' 
        imageSrc = 'images/Charlie_and_the_Choclate_Factory.jpeg' 
        Author = 'Roald Dahl'/>
        <BookBox title='Harry Potter and the Deathly Hallows'
          Author = 'J. K. Rowling'
          imageSrc = 'images/Harry_Potter.png'
        />
        <BookBox title='Charlie And the Chocolate Factory' 
        imageSrc = 'images/Charlie_and_the_Choclate_Factory.jpeg' 
        Author = 'Roald Dahl'/>
        <BookBox title='Harry Potter and the Deathly Hallows'
          Author = 'J. K. Rowling'
          imageSrc = 'images/Harry_Potter.png'
        />
        <BookBox title='Charlie And the Chocolate Factory' 
        imageSrc = 'images/Charlie_and_the_Choclate_Factory.jpeg' 
        Author = 'Roald Dahl'/>
        <BookBox title='Harry Potter and the Deathly Hallows'
          Author = 'J. K. Rowling'
          imageSrc = 'images/Harry_Potter.png'
        />
        
      </div>
    </div>
  )
}

export const NavBar = (props) => {
  const [DDMenuClass,UpdateDDMenu] = useState("hide")
  function OpenDDMenu(){
    UpdateDDMenu("DDMenu")
  }
  function CloseDDMenu(){
    UpdateDDMenu("hide");
  }
  return <navbar>
    <div className='nbar'>
      <a href='bookish-treasures.vercel.app'><img src='images/logo_bt_Home.jpg' className='dd-btn' /></a>
      <input className='SearchBar' placeholder='Search'></input>
      <div className='nbarRight'>
        <button className='LogS-btn' onClick={props.LogPage}>Login/SignUp</button>
        <button className='cart-btn'><img src='images/shop_cart_logo.png' className='cart-logo'/></button>
      </div>
      
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

export const BookBox = (props) => {
  return <bookbox>
    <div className='bb'>
      <div className='image'>
        <img src={props.imageSrc} className='poster'/>
      </div>
      <div className='book-Dets'>
        <h3 className='Title'>{props.title}</h3>
        <h7 className='Author'>by: {props.Author}</h7>
        <h3 className='price'>price</h3>
        <div className='addCart'>
          <button className='add-btn'>Add To Cart</button>
        </div>
      </div>
    </div>
  </bookbox>
}

export const SecondaryNav = () => {
  return <secondary>
    <div className='SN'>
        <select className='Categories'>
          <option>Categories</option>
          <option>Fiction</option>
          <option>Fiction</option>
          <option>Fiction</option>
          <option>Fiction</option>
        </select>
        <select className='Categories'>
          <option>Categories</option>
          <option>Fiction</option>
          <option>Fiction</option>
          <option>Fiction</option>
          <option>Fiction</option>
        </select>
        <select className='Categories'>
          <option>Categories</option>
          <option>Fiction</option>
          <option>Fiction</option>
          <option>Fiction</option>
          <option>Fiction</option>
        </select>
        <select className='Categories'>
          <option>Categories</option>
          <option>Fiction</option>
          <option>Fiction</option>
          <option>Fiction</option>
          <option>Fiction</option>
        </select>
    </div>
  </secondary>
}

export default Home

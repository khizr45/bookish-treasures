import React,{useState , useEffect} from 'react'
import './Home.css'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { useParams,useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { newUser } from '../app/features/Cart/CartSlice';
import { UseSelector } from 'react-redux';

function Home(props) {
  const dispatch = useDispatch();
  const [searchActive , setSearchActive] = useState("hide")
  const [AllBook , setBooks] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  async function FindBooks(){
    const response = await fetch("https://bookish-treasures-backend.onrender.com/getBooks");
    const data = await response.json();
    setBooks(data);
  }
  useEffect(()=>{
    FindBooks();
  },[])
  return (
    <div className="main-container-home-page">
      <div className='nav-bar-div-hai'>
        <NavBar />
      </div>
      <div className='Sec-Nav'>
        <SecondaryNav updateBooks={setBooks} reload={FindBooks}/>
      </div>
      <div className='OffersDiv'>
        <Offers />
      </div>
      <div className='Books'>
        {AllBook&&AllBook.map((items,index)=>{
          return <BookBox key={index} title={items.title} imageSrc={items.image_source} Author={items.author}
          price={items.price} ebook_price={Math.round((items.price)*0.3)} isbn={items.book_isbn}/>
        })}
      </div>
    </div>
  )
}

export const NavBar = (props) => {
  const user = useSelector(state=>state.user);
  const navigate = useNavigate();
  const [DDMenuClass,UpdateDDMenu] = useState("hide");
  const [content , setContent] = useState("");
  function OpenDDMenu(){
    UpdateDDMenu("DDMenu")
  }
  function CloseDDMenu(){
    UpdateDDMenu("hide");
  }
  function Searches(e){
      setContent(e.target.value)
    }
    function CheckUser(){
      if(user === ""){
        navigate("/user/Login");
      }else{
        navigate("/user/account");
      }
    }
  return <navbar>
    <div className='nbar'>
      <div>
        <img src='/images/logo_bt_Home.jpg' className='dd-btn' onClick={()=>{navigate("/")}}/>
        {user === '' ? '' : <button onClick={()=>{navigate('/chatBox')}} className='message_box_btn_main'><img src='/images/message_box.png'className='message_box_btn'/></button>}
      </div>
      {/* <input className='SearchBar' placeholder='Search' onChange={Searches}></input> */}
      <div className='nbarRight'>
        <button className='LogS-btn' onClick={CheckUser}>{user===""?"Login/SignUp":user}</button>
        <button className='cart-btn' onClick={()=>{navigate("/user/Cart")}}><img src='/images/shop_cart_logo.png' className='cart-logo'/></button>
      </div>
      
    </div>
  </navbar>
}

export const Offers = () => {
  var offers = ['/images/Offer1.jpg','/images/Offer2.jpg','/images/Offer3.jpg','/images/Offer4.jpg']
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
  const navigate = useNavigate();
  return(
    <div className='bb' onClick={()=>{navigate("/BkPg",{state:{ISBN:props.isbn}})}}>
      <div className='image'>
        <img src={props.imageSrc} className='poster'/>
      </div>
      <div className='book-Dets'>
        <h3 className='Title'>{props.title}</h3>
        <h7 className='Author'>by: {props.Author}</h7>
        <h3 className='price'>Physical: {props.price}</h3>
        <h3 className='price'>PDF: {props.ebook_price}</h3>
      </div>
    </div>
  )
}

export const SecondaryNav = (props) => {
  const [selectGenre,setSelectGenre] = useState("Genres");
  const [selectAuthor , setSelectAuthor] = useState("Authors");
  const [Genres,setGenres] = useState([]);
  const [Authors,setAuthors] = useState([]);
  async function FilterGenre(e){
    const value = e.target.value;
    setSelectGenre(value);
    if(value === "Genres" && selectAuthor === "Authors"){
      props.reload();
    }else{
      const response = await fetch("https://bookish-treasures-backend.onrender.com/book/filterGenre",{
          method:'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({value,selectAuthor})
      });
      const data = await response.json();
      props.updateBooks(data);
    }
  }
  async function FilterAuthor(e){
    const value = e.target.value;
    setSelectAuthor(value);
    if(value === "Authors" && selectGenre === "Genres"){
      props.reload();
    }else{
      const response = await fetch("https://bookish-treasures-backend.onrender.com/book/filterAuthor",{
          method:'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({value,selectGenre})
      });
      const data = await response.json();
      props.updateBooks(data);
    }
  }
  async function FindGenre(){
    const response = await fetch("https://bookish-treasures-backend.onrender.com/book/genre");
    const data = await response.json();
    setGenres(data);
  }
  async function FindAuthors(){
    const response = await fetch("https://bookish-treasures-backend.onrender.com/book/authors");
    const data = await response.json();
    setAuthors(data);
  }
  useEffect(()=>{
    FindGenre();
    FindAuthors();
  },[])
  return <secondary>
    <div className='SN'>
        <select className='Categories'onChange={FilterGenre}>
          <option>Genres</option>
          {Genres&&Genres.map((items,index)=>{
            return <option key={index}>{items.genre}</option>
          })}
        </select>
        <select className='Categories'onChange={FilterAuthor}>
          <option>Authors</option>
          {Authors&&Authors.map((items,index)=>{
            return <option key={index}>{items.author}</option>
          })}
        </select>
    </div>
  </secondary>
}

export default Home

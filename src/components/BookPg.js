import React, { useState,useEffect } from 'react'
import './Bookpg.css'
import { NavBar } from './Home'
import { SecondaryNav } from './Home'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { Book } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AddBook } from '../app/features/Cart/CartSlice';
import { ClearCart } from '../app/features/Cart/CartSlice';
import { newUser } from '../app/features/Cart/CartSlice';
import { UseSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

let qt = 1;

function BookPg(props) {
    const dispatch =  useDispatch();
    const {ISBN} = useLocation().state;
    let flag = false;
    const user = useSelector(state=>state.user);
    const [reviewTaking,setReviewTaking] = useState("hide");
    //dispatch(newUser(UserName));
    const [Title,setTitle] = useState("");
    const [Author,setAuthor] = useState("");
    const [avg_rating,setRating] = useState(0);
    const [Price,setPrice] = useState(0);
    const [qty,setQty] = useState(0);
    const [image_src, setImageSrc] = useState("");
    const [publish_date , setPublishDate] = useState("");
    const [genre,setGenre] = useState("");
    const [II,setII] = useState("");
    const [Reviews,setReviews] = useState([]);
    async function FindBook(){
        const response = await fetch("http://127.0.0.1:8000/Get/Book/Isbn",{
              method:'POST',
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ISBN})
          });
          const data = await response.json();
          if(data.length != 0){
            setTitle(data[0].title);
            setAuthor(data[0].author);
            setRating(data[0].average_rating);
            setPrice(data[0].price);
            setQty(data[0].quantity);
            setImageSrc(data[0].image_source);
            setPublishDate(data[0].publication_date);
            setGenre(data[0].genre);
            setII(data[0].book_isbn);
          }else{
            let isbn = ISBN
            const response3 = await fetch("http://127.0.0.1:8000/GetBook/Isbn",{
              method:'POST',
              headers: {
                  "Content-Type": "application/json",
              },
                body: JSON.stringify({isbn})
            });
            const data3 = await response3.json();
            console.log(data3);
            setTitle(data3[0].title);
            setAuthor(data3[0].author);
            setPrice(data3[0].price);
            setQty(data3[0].quantity);
            setImageSrc(data3[0].image_source);
            setPublishDate(data3[0].publication_date);
            setGenre(data3[0].genre);
            setII(data3[0].book_isbn);

          }
          window.scrollTo({ top: 0, behavior: 'auto' });
          const response2 = await fetch("http://127.0.0.1:8000/Get/Book/Review",{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ISBN})
        });
        const data2 = await response2.json();
        setReviews(data2);
    }
    useEffect(()=>{
        FindBook();
    },[])
    const [cc , setCC] = useState("desc cr")
    const [cc2 , setCC2] = useState("desc")
    const [pCC , setpCC] = useState("descrip")
    const [pCC2 , setpCC2] = useState("hide")
    const [Book_type_Btns , setBookTypeBtns] = useState("hide");
    function takeClass(){
        setCC("desc cr")
        setCC2("desc")
        setpCC("descrip")
        setpCC2("hide")
    }

    function take2(){
        setCC2("desc cr")
        setCC("desc")
        setpCC("hide")
        setpCC2("descrip")
    }
    function TakeBook(){
        if(qt === 1){
            const book_type = prompt("What Type of book (E for PDF & P for Physical)");
            if(book_type === "e" || book_type === "E"){
                const book_dets ={Name: Title, Quantity:qt, Book_Type:"E",Isbn:ISBN,Price:Price,max_qty:qty};
                dispatch(AddBook(book_dets));
            }else{
                const book_dets ={Name: Title, Quantity:qt, Book_Type:"P",Isbn:ISBN,Price:Price,max_qty:qty};
                dispatch(AddBook(book_dets));
                qt=1;
            }
        }else{
            const book_dets ={Name: Title, Quantity:qt, Book_Type:"P",Isbn:ISBN,Price:Price,max_qty:qty};
            dispatch(AddBook(book_dets));
            qt=1;
        }
    }
  return (
    <div className="main-con-bkpg">
        <ToastContainer />
      <NavBar />
      <SecondaryNav />
      <div className='book-dets'>
        <img src={image_src} className='book-img' />
        <div className='book-prop'>
            <h1 className='title'>{Title}</h1>
            <h3 className='aut'>BY: {Author}</h3>
            <StarRating avg={avg_rating}/>
            <h2 className='Price'>Price: {Price}</h2>
            <h2 className='Price'>Ebook Price: {Price*0.3}</h2>
            {qty?<Iterator max={qty}/>:<h4>Out Of Stock</h4>}
            <button className='AddCart-btn' onClick={TakeBook} {...qty?"":"disabled"}>Add To Cart</button>
        </div>
      </div>
      <div className='attr'>
          <button className={cc} onClick={takeClass}>Description</button>
          <button className={cc2} onClick={take2}>Customer Review</button>
          <h4 className={pCC}>ISBN 13 : {II}</h4>
          <h4 className={pCC}>Genre: {genre}</h4>
          <h4 className={pCC}>Publish Date: {publish_date}</h4>
            {Reviews&&Reviews.map((items,index)=>{
                return <CustomerReview key={index} user={items.username} r={items.rating} des={items.description}
                cc={pCC2} {...user===items.username?flag=true:flag}/>
            })}
      </div>
            <div className='review-btn-div'>
                {user===""||flag===true?"":<button className='review-btn' onClick={()=>{setReviewTaking(pCC2)}}>Give Review</button>}
                <CustomerReviewTaking user={user} cc={reviewTaking} ccFunc = {setReviewTaking} i={ISBN} u={user} reload={FindBook}/>
            </div>
    </div>
  )
}

export const StarRating = (props) =>{
    return <rating>
    <div className='SR'>
    <Rating
        name="read-only"
        value={props.avg}
        readOnly
      />
      </div>
    </rating>
}

export const Iterator = (props) => {
    const [value , setValue] = useState(1);
    function QtyLess(){
        if(value != 1){
            qt = value - 1;
            setValue(qt)
        }
    }

    function QtyUp(){
        if(value != props.max){
            qt = value+1;
            setValue(qt);
        }
    }
    return <iterator>
        <div className='Iter'>
            <button className='minus' onClick={QtyLess}>_</button>
            <h4 className='Val'>{value}</h4>
            <button className='plus' onClick={QtyUp}>+</button>
        </div>
    </iterator>
}

export const CustomerReview=(props)=>{
    return(
        <div className={props.cc}>
            <h4>{props.user}</h4>
            <StarRating avg={props.r}/>
            <h6>{props.des}</h6>
        </div>
    )
}

export const CustomerReviewTaking=(props)=>{
    const [ratingValue,setRatingValue] = useState(0);
    const [reviewContent,setReviewContent] = useState("");
    function onHandleChange(e){

    }
    async function SubmitReview(){
        props.ccFunc("hide");
        if(ratingValue === 0){
            toast.warning("Please provide rating",{
                position:toast.POSITION.TOP_RIGHT,
            })
        }else{
            const user = props.u;
            const isbn = props.i;
            const response = await fetch("http://127.0.0.1:8000/user/review",{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ratingValue,user,isbn,reviewContent})
            })
            const data =  await response.json();
            if(data === "successfull"){
                props.reload();
            }
        }
    }
    return(
        <div className={props.cc}>
            <h4>{props.user}</h4>
            <div className='SR'>
                <Rating
                    name="read-only"
                    value={ratingValue}
                    onChange={(event, newValue) => {
                        setRatingValue(newValue);
                      }}
                />
            </div>
            <input type='description' placeholder='Review' rows={500} onChange={(e)=>{setReviewContent(e.target.value)}}/>
            <button className='submit-btn' onClick={SubmitReview}>Submit</button>
        </div>
    )
}

export default BookPg

import React, { useState } from 'react'
import './Bookpg.css'
import { NavBar } from './Home'
import { SecondaryNav } from './Home'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function BookPg(props) {
  return (
    <div className={props.cName}>
      {/* <h1>{props.source}</h1>
      <h1>{props.BkTitle}</h1>
      <h1>{props.BkAuthor}</h1>
      <h1>{props.BkPrice}</h1>
      <h1>Hello</h1> */}
      <NavBar />
      <SecondaryNav />
      <div className='book-dets'>
        <img src={props.source} className='book-img' />
        <div className='book-prop'>
            <h1 className='title'>{props.BkTitle}</h1>
            <h3>BY: {props.BkAuthor}</h3>
            <StarRating />
            <h2 className='Price'>{props.BkPrice}</h2>
            <Iterator />
        </div>
      </div>
    </div>
  )
}

export const StarRating = () =>{
    return <rating>
    <div className='SR'>
    <Rating
        name="read-only"
        value="2"
        readOnly
      />
      </div>
    </rating>
}

export const Iterator = () => {
    const [value , setValue] = useState(1)
    function QtyLess(){
        if(value != 0){
            setValue(value-1)
        }
    }

    function QtyUp(){
        setValue(value+1)
    }
    return <iterator>
        <div className='Iter'>
            <button className='minus' onClick={QtyLess}>_</button>
            <h4 className='Val'>{value}</h4>
            <button className='plus' onClick={QtyUp}>+</button>
        </div>
    </iterator>
}

export default BookPg

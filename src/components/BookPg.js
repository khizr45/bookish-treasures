import React, { useState } from 'react'
import './Bookpg.css'
import { NavBar } from './Home'
import { SecondaryNav } from './Home'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function BookPg(props) {
    const [cc , setCC] = useState("desc cr")
    const [cc2 , setCC2] = useState("desc")
    const [pCC , setpCC] = useState("descrip")
    const [pCC2 , setpCC2] = useState("hide")
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
  return (
    <div className={props.cName}>
      <NavBar LogPage = {props.doHome}/>
      <SecondaryNav />
      <div className='book-dets'>
        <img src={props.source} className='book-img' />
        <div className='book-prop'>
            <h1 className='title'>{props.BkTitle}</h1>
            <h3 className='aut'>BY: {props.BkAuthor}</h3>
            <StarRating />
            <h2 className='Price'>{props.BkPrice}</h2>
            <Iterator />
            <button className='AddCart-btn'>Add To Cart</button>
        </div>
      </div>
      <div className='attr'>
          <button className={cc} onClick={takeClass}>Description</button>
          <button className={cc2} onClick={take2}>Customer Review</button>
          <p className={pCC}>Greetings to you, the lucky finder of this Gold Ticket from Mr Willy Wonka! I shake you warmly by the hand! Tremendous things are in store for you!

One miraculous moment changes Charlie Bucket's life forever.

A boy who only gets to eat cabbage soup for breakfast, lunch and dinner finds a Golden Ticket that will take him into Willy Wonka's magical chocolate factory.

Joining him on the tour are four horrible blighters:

Augustus Gloop - a great big greedy nincompoop, Veruca Salt - a spoiled brat, Violet Beauregarde - a repulsive little gum-chewer and Mike Teavee - a TV addict.

With a chocolate river, crafty squirrels and mysterious Oompa Loompas, Mr Wonka's chocolate factory is the strangest, most magnificent place Charlie has ever seen.

What other surprises are in store for the lucky ticket winners?

Now you can listen to CHARLIE AND THE CHOCOLATE FACTORY and other Roald Dahl audiobooks read by some very famous voices, including Kate Winslet, David Walliams and Steven Fry - plus there are added squelchy soundeffects from Pinewood Studios!</p>

<p className={pCC2}>Jess, my 7 year old little girl, gives it 5 stars.

Comments while reading:

“How come someone is called ‘Gloop’? And ‘Salt’? Isn’t that the thing that we use for cooking?”

“What is ‘spoiled’? Oh, okay, I’m NOT spoiled.”

“Huh, Grandpa Joe is 96 years old?! How come that he’s even older than my grandpa?”</p>
      </div>
    </div>
  )
}

export const StarRating = () =>{
    return <rating>
    <div className='SR'>
    <Rating
        name="read-only"
        value="4"
        readOnly
      />
      </div>
    </rating>
}

export const Iterator = () => {
    const [value , setValue] = useState(1)
    function QtyLess(){
        if(value != 1){
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

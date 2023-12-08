import React from 'react'
import { useLocation } from 'react-router-dom'
import { NavBar } from './Home';
import "./Account_info.css";
import { useEffect,useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { UseSelector, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { newUser } from '../app/features/Cart/CartSlice';

function Account_Info() {
    const UserName = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [UN,setUN] = useState("");
    const [Fname,setFname] = useState("");
    const [Pno,setPno] = useState("");
    const [Email,setEmail] = useState("");
    const [PendingItems,setPendingItems] = useState([]);
    const [EbookItems,setEbookItems] = useState([]);
    async function FindDets(){
        const response = await fetch("http://127.0.0.1:8000/Get/user/username",{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({UserName})
        });
        const data = await response.json();
        setUN(data[0].username);
        setFname(data[0].name);
        setEmail(data[0].email);
        setPno(data[0].phone_number);
    }
    async function FindOrders(){
        let pending = [];
        let ebook = [];
        const response = await fetch("http://127.0.0.1:8000/Get/user/orders",{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({UserName})
        });
        const data = await response.json();
        for(let i=0 ;i < data.length;i++){
            if(data[i].status === "P"){
                pending.push(data[i]);
            }else if(data[i].status==="F" && data[i].type_id === 2){
                let f = 0
                ebook.forEach((elements,index)=>{
                    if(ebook[index].book_isbn === data[i].book_isbn){
                        f = 1;
                    }
                })
                if(f === 0){
                    ebook.push(data[i]);
                }
            }
        }
        setEbookItems(ebook);
        setPendingItems(pending);
    }
    function LogOut(){
        dispatch(newUser(""));
        navigate("/");
    }
    useEffect(()=>{
        FindDets();
        FindOrders();
    },[])
  return (
    <div className='Account-main'>
        <ToastContainer />
        <NavBar activeUser = {UserName}/>
        <button className='LogOutBtn' onClick={LogOut}>Logout</button>
        <h3 className='basic-dets-head'>Basic Details</h3>
        <div className='basic-dets'>
            <div>
                <h4>Username: {UN}</h4>
                <h4>Name: {Fname}</h4>
            </div>
            <div>
                <h4>Phone_Number: {Pno}</h4>
                <h4>Email: {Email}</h4>
            </div>
        </div>
        <div className='order-dets'>
            <div className='pending-orders'>
                <h4 className='half-log-head'>Pending Orders</h4>
                {PendingItems&&PendingItems.map((items,index)=>{
                    return <PendingOrders key={index} book={items.book_isbn} pay={items.payment_id} id={items.order_id}
                    onCancel={FindOrders}/>
                })}
            </div>
            <div className='ebook-log'>
                <h4 className='half-log-head'>Ebooks</h4>
                {EbookItems&&EbookItems.map((items,index)=>{
                    return <EbookItem key={index} book={items.book_isbn}/>
                })}
            </div>
        </div>
    </div>
  )
}
export const PendingOrders= (props)=>{
    const [Title , setTitle] = useState("");
    const [Payment,setPayment] = useState("");
    async function  findTitle(){
        const isbn = props.book;
        const response = await fetch("http://127.0.0.1:8000/GetBook/Isbn",{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({isbn})
        });
        const data = await response.json();
        setTitle(data[0].title);
        if(props.pay === 1){
            setPayment("COD");
        }else{
            setPayment("Paid");
        }
    }
    async function CancelOrder(){
        if(Payment === "Paid"){
            toast.error("Order Paid Cannot Cancel",{
                position:toast.POSITION.TOP_RIGHT,
            });
        }else{
            const oi = props.id
            const response = await fetch("http://127.0.0.1:8000/Cancel/Order",{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({oi})
            });
            const data = await response.json();
            if(data === "successfull"){
                toast.success("Order Cancelled Successfully",{
                    position:toast.POSITION.TOP_RIGHT,
                })
                props.onCancel();
            }

        }
    }
    useEffect(()=>{
        findTitle();
    },[])
    return(
        <div className='pending-item'>
            <div>
                <h4>Book: {Title}</h4>
                <h4>Payment: {Payment}</h4>
            </div>
            <button onClick={CancelOrder}>Cancel Order</button>
        </div>
    )
}

export const EbookItem = (props)=>{
    const [Title , setTitle] = useState("");
    const [ebook_source,setsource] = useState("");
    async function  findTitle(){
        const isbn = props.book;
        const response = await fetch("http://127.0.0.1:8000/GetBook/Isbn",{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({isbn})
        });
        const data = await response.json();
        setTitle(data[0].title);
        setsource(data[0].ebook_source);
    }
    useEffect(()=>{
        findTitle();
    },[])
    return(
        <div className='ebook-item'>
            <h4>Book: {Title}</h4>
            <button onClick={()=>{window.open(ebook_source)}}>Open Book</button>
        </div>
    )
}

export default Account_Info
import React, { useState } from 'react'
import { UseSelector, useSelector } from 'react-redux';
import { NavBar } from './Home';
import  "./ShoppingCart.css";
import { Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import QuantityInput from './QuantityPicker';
import { UpdateQuantity } from '../app/features/Cart/CartSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Form } from 'react-router-dom';
import { RemoveBook } from '../app/features/Cart/CartSlice';
import { ToastContainer, toast } from 'react-toastify';
import { ClearCart } from '../app/features/Cart/CartSlice';
function ShoppingCart() {
    const dispatch = useDispatch();
    const Book = useSelector(state=>state.Book);
    const user = useSelector(state=>state.user);
    const [age, setAge] = React.useState('');
    const [CardClass , setCardClass] = useState("hide");
    const [CardName,setCardName] = useState("");
    const [CardNum,setCardNum] = useState("");
    const [CardCvv,setCvv] = useState("");
    const [ExpiryDate,setExpiryDate] = useState("");

    const handleChange = (event) => {
      setAge(event.target.value);
      if(event.target.value === "VISA"){
        setCardClass("CardDetails")
      }else{
        setCardClass("hide");
      }
    };
  
  
    const quantityChange = (index, quantity,max_qty) => {
        if(quantity <= max_qty){
            dispatch(UpdateQuantity({index, quantity}))
        }
    };
    async function FindPrice(index){
        const isbn = Book[index].isbn
        return isbn;
    }
    const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    async function OrderPlace(){
        if(user === ""){
            alert("Please Login First");
        }else{
            if(age==="VISA" && (CardCvv==="" || CardName === "" || CardNum==="" || ExpiryDate==="")){
                toast.error("Enter All details",{
                    position:toast.POSITION.TOP_RIGHT,
                })
            }else if(age==="VISA" && CardNum.length !== 16){
              toast.error("Invalid Card Number",{
                position:toast.POSITION.TOP_RIGHT
              })
            }else if(age==="VISA"&&CardCvv.length !== 3){
              toast.error("Invalid CVV Number",{
                position:toast.POSITION.TOP_RIGHT
              })
            }else if(age==="VISA"&& !dateRegex.test(ExpiryDate)){
              toast.error("Invalid EXPIRY DATE",{
                position:toast.POSITION.TOP_RIGHT
              })
            }else if(Book.length === 0){
              toast.warning("Currently No Items in cart",{
                position:toast.POSITION.TOP_RIGHT
              })
            }
            else{
                const response = await fetch("https://bookish-treasures-backend.onrender.com/user/PlaceOrder",{
                  method:'POST',
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({Book,user,age})
                });
                const data = await response.json();
                if(data === "successfull"){
                    toast.success("Order Placed Successfully (All your ebooks will be available in your account)",{
                        position:toast.POSITION.TOP_RIGHT,
                    });
                    setCardClass("hide");
                }
                dispatch(ClearCart());
            } 
        }
    }
  return (
    <div className='Cart-Main'>
        <ToastContainer />
        <NavBar />
        <div className='Items-Cart'>
        <TableContainer
        sx={{ display: "flex", justifyContent: "center", overflow: "auto" }}
      >
        <Table
          sx={{
            minWidth: 650,
            maxWidth: 500,
            maxHeight: 300,
            overflow: "auto",
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{borderBottom: "3px solid #3c2e27"}}>Name</TableCell>
              <TableCell align="right" sx={{borderBottom: "3px solid #3c2e27"}}>UnitPrice</TableCell>
              <TableCell align="right" sx={{borderBottom: "3px solid #3c2e27"}}>TotalPrice</TableCell>
              <TableCell align="right" sx={{borderBottom: "3px solid #3c2e27"}}>PDF</TableCell>
              <TableCell align="right" sx={{ marginRight: 40,  borderBottom: "3px solid #3c2e27"}}>
                Quantity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <h4 className='empty-cart-head'>{Book.length === 0?"Currently no items in cart":""}</h4>
            {Book.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{borderBottom: "3px solid #3c2e27"}}>
                  {row.Name}
                </TableCell>
                <TableCell align="right" sx={{borderBottom: "3px solid #3c2e27"}}>{row.Book_Type==="P"?row.Price:row.Price*0.3}</TableCell>
                <TableCell align="right" sx={{borderBottom: "3px solid #3c2e27"}}>{row.Book_Type==="P"?(row.Price)*(row.Quantity):Math.round((row.Price)*(row.Quantity)*0.3)}</TableCell>
                <TableCell align="right" sx={{borderBottom: "3px solid #3c2e27"}}>{row.Book_Type === "P"?"No":"Yes"}</TableCell>
                <TableCell align="right" sx={{borderBottom: "3px solid #3c2e27"}}>
                  {row.Book_Type==="P" ? <QuantityInput quantity={row.Quantity} quantityChange={(val) => { quantityChange(index, val,row.max_qty);}}/>:"Ebook Quantity fixed to 1"}
                  </TableCell>
                <TableCell align="right" sx={{borderBottom: "3px solid #3c2e27"}}>
                    <button className='Remove-Btn' onClick={()=>{dispatch(RemoveBook(row.Name))}}>
                        Remove
                    </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </div>
        <div className='PaymentOptsFull'>
            <div className='PaymentOpts'>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Payment Options</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={"COD"}>COD</MenuItem>
                            <MenuItem value={"VISA"}>VISA CARD</MenuItem>
                        </Select>
                    </FormControl> 
                </Box>
            </div>
        </div>
        <div className={CardClass}>
           <div className='CardDetsMain'>
                <input placeholder='Name On Card'onChange={(e)=>{setCardName(e.target.value)}}/>
                <input placeholder='Card Number'onChange={(e)=>{setCardNum(e.target.value)}}/>
                <input placeholder='CVV'onChange={(e)=>{setCvv(e.target.value)}}/>
                <input placeholder='Expiry Date(YYYY/MM/DD)'onChange={(e)=>{setExpiryDate(e.target.value)}}/>
           </div>
        </div>
        <div className='Ch-btn'>
            <button onClick={OrderPlace}>Place Order</button>
        </div>
    </div>
  )
}

export default ShoppingCart
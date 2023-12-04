import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Book: [],
    user:""
}

export const Cart = createSlice({
    name: 'checked',
    initialState,
    reducers: {
        AddBook: (state,action)=>{
            let flag = 0;
            state.Book.forEach((element,index)=>{
                if(element.Name === action.payload.Name && element.Book_Type === action.payload.Book_Type){
                    state.Book[index].Quantity=action.payload.Quantity;
                    flag = 1;
                }
            })
            if(flag === 0){
                state.Book.push(action.payload);
            }
        },
        RemoveBook: (state,action)=>{
            state.Book.forEach((element,index)=>{
                if(action.payload === element.Name){
                    state.Book.splice(index,1);
                }
            })
        },
        UpdateQuantity: (state,action)=>{
            state.Book[action.payload.index].Quantity = action.payload.quantity
        },
        ClearCart: (state,action)=>{
            state.Book = [];
        },
        newUser:(state,action)=>{
            state.user = action.payload;
        }
    }
})

export const {ClearCart,UpdateQuantity,RemoveBook,AddBook,newUser} = Cart.actions
export default Cart.reducer
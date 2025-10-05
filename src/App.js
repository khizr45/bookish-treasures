import React , {useState} from 'react'
import { BrowserRouter as Router, Route, Switch, createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import BookPg from './components/BookPg';
import Register from './components/Register';
import Account_Info from './components/Account_Info';
import { Provider } from 'react-redux';
import {store} from './app/store';
import ShoppingCart from './components/ShoppingCart'
import ChatBox from './components/ChatBox';
import { SingleChat } from './components/messages/SingleChat';
function App() {
  const router = createBrowserRouter ([{
    path:'/',
    element:<Home/>
  },
  {
    path:'/user/Login',
    element:<Login />
  },
  {
    path:"/user/Register",
    element:<Register />
  },
  {
    path:"/BkPg",
    element:<BookPg />
  },
  {
    path:"/user/account",
    element:<Account_Info />
  },
  {
    path:"/user/Cart",
    element:<ShoppingCart />
  },
  {
    path:"/chatBox",
    element:<SingleChat/>
  }
])
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

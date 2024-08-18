import React from 'react'
import ReactDOM from 'react-dom/client'

import {createBrowserRouter, RouterProvider, Route, createRoutesFromElements} from 'react-router-dom'
import Chat from './Pages/Chat.jsx';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import SelectAvatar from './Pages/SelectAvatar.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Chat/>}/>
    <Route path= "register" element={<Register/>} />
    <Route path= "login" element={<Login/>} />
    <Route path= "setAvatar" element={<SelectAvatar/>} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
)

//for working with form state:
// import { useState } from 'react';


import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
//multi-page routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import all pages/xxx.js
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Event from "./pages/Event";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Activate from "./pages/Activate";
import AuthReset from "./pages/AuthReset";
import NoPage from "./pages/NoPage";

//define page routes as a component:
export default function App() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="events" element={<Events />} />
                <Route path="event/:id" element={<Event />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="contact" element={<Contact />} />
                <Route path="register" element={<Register />} />
                <Route path="activate" element={<Activate />} />
                <Route path="reset" element={<AuthReset />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);






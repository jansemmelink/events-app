import React from 'react';
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul className="topnav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li className="right">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="right">
            <Link to="/register">Register</Link>
          </li>
          <li className="right">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
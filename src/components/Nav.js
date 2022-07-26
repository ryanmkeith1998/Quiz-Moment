import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Landing';
import { NavLink } from "react-router-dom";
  
const Navbar = () => {
  return (
      <>
        <NavLink exact to='/Home'>
            poop link
        </NavLink>
        <NavLink exact to='/About'>
            poop link
        </NavLink>
        <Routes>
            <Route path='/About' element={<Home/>} />
        </Routes>
      </>
      
  );
};
  
export default Navbar;
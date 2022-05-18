import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css"

import { AuthContext } from "../../contexts/authContext";

//===============================================================

const NavBar = () => {
  const { token ,logout, isLoggedIn } = useContext(AuthContext);
  

  //===============================================================

  return (
    <>
      <div className="NavBar">
      <Link className="Link" to="/">
              Home
            </Link>
          <input></input>
      <Link className="Link" to="/games">
              Add New Post
            </Link>
      
            <Link className="Link" to="/category">
             Category
            </Link>
          
        {isLoggedIn ? (
          <>
          
            {/* <Link className="Link" to="/dashboard">
              Dashboard
            </Link> */}
          
            <button className="logout" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
          <div className="LogReg">
            <Link className="Link" to="/register">
              Register
            </Link>
            <Link to="/login">Login</Link>
            </div>
          </>
        )}        
        
      </div>
    </>
  );
};

export default NavBar;
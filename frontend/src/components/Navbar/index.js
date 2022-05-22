import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./style.css";

import { AuthContext } from "../../contexts/authContext";

//===============================================================

const NavBar = () => {
  const {logout, isLoggedIn, userId } = useContext(AuthContext);

  //===============================================================

  return (
    <>
      <div className="NavBar">
        <div className="siteIcon">
          <img
            src={`https://res.cloudinary.com/faresmerakproject4/image/upload/v1653183119/project_4/Icons/dizzy_4_s6dgte.png`}
            alt={`Icon`}
            width="80"
            height="80"
          ></img>
          <h4>Vertigo</h4>
        </div>
        <ul class="menu cf">
          <li>
            <Link className="Link" to="/">
              <a>Home</a>
            </Link>
          </li>

          <li>
            <Link className="Link" to="/category">
              <a>Category</a>
            </Link>
          </li>
        </ul>

        <ul class="menu cf">
          {isLoggedIn ? (
            <>
              <li>
                <a onClick={logout}> Logout</a>
              </li>
              {/* <li>
                <Link className="Link" to={`/user/${userId}`}>
                  <a>Profile</a>
                </Link>

                <ul class="submenu">
                  <li>
                    <Link className="Link" to={`/user/${userId}`}>
                      <a>My Information</a>
                    </Link>
                  </li>
                  <li>
                    <Link className="Link" to={`/user/${userId}/posts`}>
                      <a>My Posts</a>
                    </Link>
                  </li>
                </ul>
              </li> */}
            </>
          ) : (
            <>
              <li>
                <Link className="Link" to="/register">
                  <a>Register</a>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <a>Login</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default NavBar;

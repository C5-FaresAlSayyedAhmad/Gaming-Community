import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import axios from "axios";

import { AuthContext } from "../../contexts/authContext";

//===============================================================

const Login = () => {
  const { isLoggedIn, saveToken , saveUserId } = useContext(AuthContext);
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if (res.data.success) {
        setMessage("");
        saveUserId(res.data.userId)
        localStorage.setItem("token", res.data.token);
        saveToken(res.data.token);
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  //===============================================================

  useEffect(() => {
    if (isLoggedIn) {
      history("/games");
    }
  });

  //===============================================================

  return (
    <>

<div class="container">
	<div class="screen">
		<div class="screen__content">
			<form class="login" onSubmit={login}>
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input type="email" class="login__input" placeholder="Email"  onChange={(e) => setEmail(e.target.value)}/>
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="password" class="login__input" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button class="button login__submit">
					<span class="button__text">Log In Now</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div class="social-login">			
				<div class="social-icons">
					<a href="#" class="social-login__icon fab fa-instagram"></a>
					<a href="#" class="social-login__icon fab fa-facebook"></a>
					<a href="#" class="social-login__icon fab fa-twitter"></a>
				</div>
			</div>
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>

  

        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </div>
    </>
  );
};




export default Login;
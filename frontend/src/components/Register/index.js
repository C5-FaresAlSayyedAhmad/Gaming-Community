import React, { useContext, useState } from "react";
import "./style.css";
import axios from "axios";

import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

// =================================================================

const Register = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const history = useNavigate()

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  // =================================================================

  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users", {
        firstName,
        lastName,
        userName,
        email,
        password,
      });
      if (result.data.success) {
        setStatus(true);
        setMessage("The user has been created successfully");
        history("/login")
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };

  // =================================================================

  return (
    <>
      <div className="Form">
        {!isLoggedIn ? (
          <>
<div class="container">
	<div class="screen">
		<div class="screen__content">
			<form class="signUp" form onSubmit={addNewUser}>
				<div class="login__field">
					<i class="login__icon fas fa-user"></i>
					<input type="text" class="login__input" placeholder="First Name"  onChange={(e) => setFirstName(e.target.value)}/>
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="text" class="login__input"  placeholder="Last Name"  onChange={(e) => setLastName(e.target.value)}/>
				</div>
        <div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="text" class="login__input" placeholder="User Name"  onChange={(e) => setUserName(e.target.value)}/>
				</div>
        <div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="email" class="login__input"  placeholder="Email"   onChange={(e) => setEmail(e.target.value)}/>
				</div>
        <div class="login__field">
					<i class="login__icon fas fa-lock"></i>
					<input type="password" class="login__input" placeholder="Password"  onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button class="button login__submit">
					<span class="button__text">Sign Up Now</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
            {status
              ? message && <div className="SuccessMessage">{message}</div>
              : message && <div className="ErrorMessage">{message}</div>}
          </>
        ) : (
          <p>Logout First</p>
        )}
      </div>
    </>
  );
};




export default Register;

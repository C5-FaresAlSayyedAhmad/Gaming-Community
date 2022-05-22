import React, { useContext, useEffect, useState } from "react";
import "./style.css";

import axios from "axios";

import { AuthContext } from "../../contexts/authContext";
//===============================================================

const UserPosts = () => {
  const { token , userId} = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  //===============================================================
  

  const getUserPosts= async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${userId}/posts`
      , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );

      if (res.data.success) {
          


        setPosts(res.data.posts);
        setMessage("");
        setShow(true);
        // setUserId(res.data.userId);        
      } else throw Error;
    } catch (error) {
       
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };


  //===============================================================

  useEffect(() => {
    getUserPosts();
  }, []);

  //===============================================================

  return (
    <div className="userPosts">
  <br />
  {show &&
    posts.map((post, index) => (           
        <div key={index} className="Posts" >
        <div  >{post.title} </div> 
     
      </div>
   
    ))
    }
  {message && <div>{message}</div>}
</div>
  );
};

export default UserPosts;
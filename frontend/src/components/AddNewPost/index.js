import React, { useContext, useState, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import "./style.css";

import axios from "axios";

import { AuthContext } from "../../contexts/authContext";

//===============================================================

const AddNewPost = () => {
  const { token, isLoggedIn } = useContext(AuthContext);
  const history = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const id = useParams();

  //===============================================================

  const createNewPost = async (e) => {
    e.preventDefault();
    try {
      const gamePost = {
        title,
        description,
        image,
      };
      const result = await axios.post(
        `http://localhost:5000/games/${id.gameid}`,
        gamePost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        setStatus(true);
        setMessage("The Post has been created successfully");
        history(`/games/${id.gameid}`);
      }
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    }
  };

  //===============================================================

  useEffect(() => {
    if (!isLoggedIn) {
      history("/login");
    }
  });

  //===============================================================
  return (
    <>
      <div className="NewPost">
        <form onSubmit={createNewPost}>
          <br />
          <input
            type="text"
            placeholder="Post Title "
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <textarea
            placeholder="Post Description "
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <br />
          <textarea
            placeholder="Post image link"
            onChange={(e) => setImage(e.target.value)}
          ></textarea>
          <br />

          <button>Create New Post</button>
        </form>
        <br />
        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </div>
    </>
  );
};

export default AddNewPost;

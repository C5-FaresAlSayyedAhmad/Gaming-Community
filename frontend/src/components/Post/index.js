import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";

import axios from "axios";

import { AuthContext } from "../../contexts/authContext";
//===============================================================

const Post = () => {
  const { token, userId } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [post, setPost] = useState([]);
  const [show, setShow] = useState(false);
  const [userN, setUserN] = useState("");
  const [userI, setUserI] = useState("");
  const [description, setDescription] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [postId, setPostId] = useState(false);
  const [message, setMessage] = useState("");
  const history = useNavigate();
  const [comment, setComment] = useState("");
  const id = useParams();

  //===============================================================

  const getPost = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/category/${id.categoryid}/games/${id.gameid}/posts/${id.postid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setUserN(res.data.username);
        setUserI(res.data.userid);
        setPost(res.data.post);
        setMessage("");
        setShow(true);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //===============================================================

  const handleUpdateClick = (post) => {
    setUpdateBox(!updateBox);
    setPostId(post._id);
    setTitle(post.title);
    setDescription(post.description);
    if (updateBox) updatePost(post._id);
  };

  //===============================================================

  const updatePost = async () => {
    try {
      await axios.put(
        `http://localhost:5000/category/${id.categoryid}/games/${id.gameid}/posts/${id.postid}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getPost();
    } catch (error) {
      console.log(error);
    }
  };

  //===============================================================

  const deletePost = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/category/${id.categoryid}/games/${id.gameid}/posts/${id.postid}`
      );

      history(`/games/${id.gameid}`);
    } catch (error) {
      console.log(error);
    }
  };

  //===============================================================

  const addComment = async () => {
    try {
      await axios.post(
        `http://localhost:5000/games/${id.gameid}/posts/${id.postid}/comment`,
        {
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getPost();
    } catch (error) {
      console.log(error.response);
    }
  };

  //===============================================================

  useEffect(() => {
    getPost();
  }, []);

  //===============================================================

  return (
    <div className="post">
      <div className="postTitle1">{post.title}</div>
      <div className="postDescription">{post.description}</div>
      <div className="poster">Posted by: {userN}</div>
      <div className="commentClass">
        <textarea
          className="commentBox"
          placeholder="Comment"
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button
          className="commentBtn"
          onClick={() => {
            addComment();
          }}
        >
          Add comment
        </button>
      </div>
      {userI === userId ? (
        <>
          {updateBox && postId === post._id && (
            <form>
              <br />
              <input
                type="text"
                defaultValue={post.title}
                placeholder="Post Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />

              <textarea
                placeholder="Post Description"
                defaultValue={post.description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </form>
          )}
          <button className="delete" onClick={() => deletePost()}>
            X
          </button>
          <button className="update" onClick={() => handleUpdateClick(post)}>
            Update
          </button>
        </>
      ) : (
        <></>
      )}
      <br />
      {show &&
        post.comments.map((comment, index) => (
          <div key={index} className="comments">
            {/* <Link className="Link" to={`/category/${id.categoryid}/games/${id.gameid}/posts/${post._id}`}> */}
            <div>{comment.comment} </div>
            <div>By: {comment.commenter.userName} </div>
          </div>
        ))}

      {message && <div>{message}</div>}
    </div>
  );
};

export default Post;

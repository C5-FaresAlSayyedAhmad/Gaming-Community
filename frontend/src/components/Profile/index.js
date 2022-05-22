import React, { useContext, useEffect, useState } from "react";
import "./style.css";

import axios from "axios";

import { AuthContext } from "../../contexts/authContext";
//===============================================================

const Profile = () => {
  const { token, userId } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState([]);
  const [message, setMessage] = useState("");

  //===============================================================

  const UserInfo = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setUserInfo(res.data.user);
        setMessage("");
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
    UserInfo();
  }, []);

  //===============================================================

  return (
    <div className="info">
      <br />
      <div>{userInfo.firstName}</div>
      <div>{userInfo.lastName}</div>
      <div>{userInfo.userName}</div>
      <div>{userInfo.email}</div>

      <div>FavList</div>
      <div>Add FavList</div>

      {/* {show &&
        userInfo.map((info, index) => (
            
            <div key={index} className="info" >
                <Link className="Link" to={`/games/${game._id}`}>
     
            <div>
              {game.comments ? (
                game.comments.map((comment, i) => {
                  return (
                    <p className="comment" key={i}>
                      {comment.comment}
                    </p>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            {article.author === userId && (
              <>
                {updateBox && articleId === article._id && (
                  <form>
                    <br />
                    <input
                      type="text"
                      defaultValue={article.title}
                      placeholder="article title here"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />

                    <textarea
                      placeholder="article description here"
                      defaultValue={article.description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </form>
                )}
                <button
                  className="delete"
                  onClick={() => deleteArticle(article._id)}
                >
                  X
                </button>
                <button
                  className="update"
                  onClick={() => handleUpdateClick(article)}
                >
                  Update
                </button>
              </>
            )}
            <div>
              <textarea
                className="commentBox"
                placeholder="comment..."
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button
                className="commentBtn"
                onClick={() => {
                  addComment(article._id);
                }}
              >
                Add comment
              </button>
            </div>
            </Link>
          </div>
       
        ))
        } */}
      {message && <div>{message}</div>}
    </div>
  );
};

export default Profile;

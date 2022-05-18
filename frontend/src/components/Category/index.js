import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.css";

import axios from "axios";

import { AuthContext } from "../../contexts/authContext";
//===============================================================

const Category = () => {
  const { token } = useContext(AuthContext);

  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [articleId, setArticleId] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [comment, setComment] = useState("");
  const id  = useParams()

  //===============================================================
  

  const getCategoryGames = async () => {
      console.log("id",id.categoryid);
    try {
      const res = await axios.get(`http://localhost:5000/category/${id.categoryid}/games`
    //   , {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
      );

      if (res.data.success) {
          

        console.log("Res1",res.data);
        setCategory(res.data.category);
        setMessage("");
        setShow(true);
        setUserId(res.data.userId);        
      } else throw Error;
    } catch (error) {
       
      if (!error.response.data.success) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  //===============================================================

//   const handleUpdateClick = (article) => {
//     setUpdateBox(!updateBox);
//     setArticleId(article._id);
//     setTitle(article.title);
//     setDescription(article.description);
//     if (updateBox) updateArticle(article._id);
//   };

  //===============================================================

//   const updateArticle = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/articles/${id}`, {
//         title,
//         description,
//       });
//       getAllArticles();
//     } catch (error) {
//       console.log(error);
//     }
//   };

  //===============================================================

//   const deleteArticle = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/articles/${id}`);
//       getAllArticles();
//     } catch (error) {
//       console.log(error);
//     }
//   };

  //===============================================================

//   const addComment = async (id) => {
//     try {
//       await axios.post(
//         `http://localhost:5000/articles/${id}/comments`,
//         {
//           comment,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       getAllArticles();
//     } catch (error) {
//       console.log(error.response);
//     }
//   };

  //===============================================================

  useEffect(() => {
    getCategoryGames();
  }, []);

  //===============================================================

  return (
    <div className="category">
      <br />
      {show &&
        category.map((game, index) => (           
            <div key={index} className="cat" >
                <Link className="Link" to={`/category/${id.categoryid}/games/${game._id}`}>
            <div  >{game.title}</div>     
            {/* <div>
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
            </div> */}
            {/* {article.author === userId && (
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
            </div> */}
            </Link>
          </div>
       
        ))
        }
      {message && <div>{message}</div>}
    </div>
  );
};

export default Category;
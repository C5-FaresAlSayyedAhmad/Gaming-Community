import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.css";

import axios from "axios";

import { AuthContext } from "../../contexts/authContext";
//===============================================================

const Category = () => {
  const { token } = useContext(AuthContext);

  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [articleId, setArticleId] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [comment, setComment] = useState("");
  const id = useParams();

  //===============================================================

  const getCategoryGames = async () => {

    try {
      const res = await axios.get(
        `http://localhost:5000/category/${id.categoryid}/games`
        //   , {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
      );

      if (res.data.success) {
        console.log("Res Category", res.data);
        setCategoryName(res.data.categoryName)
        setCategoryImage(res.data.categoryImage)
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
   <>
    <div className="categoryName">   <img
                  src={`${categoryImage}`}
                  alt={`${categoryName}`}
                  width="100"
                  height="100"
                ></img></div>
    <div className="games">
       
      
      {show &&
        category.map((games, index) => (
          <div key={index} className="game12">
            <Link
              className="imageGameLink"
              to={`/category/${id.categoryid}/games/${games._id}`}
            >
              <div>
                <img
                  src={`${games.image}`}
                  alt={`${games.title}`}
                  width="120"
                  height="200"
                  className="gameImageAll"
                ></img>
              </div>
            </Link>
            <div className="gameNameContainer">
              <p className="gameNameText">{games.title}</p>
            </div>
          </div>
        ))}
      {message && <div>{message}</div>}
    </div>
    </>

  );
};

export default Category;

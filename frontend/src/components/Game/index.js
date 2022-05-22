import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.css";

import axios from "axios";

import { AuthContext } from "../../contexts/authContext";
//===============================================================

const Game = () => {
  const { token , userId , isLoggedIn} = useContext(AuthContext);
  const history = useNavigate();
  const [game, setGame] = useState([]);
 
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [articleId, setArticleId] = useState(false);
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState("");
  const id  = useParams()
  const [favgameid, setfavgameid] = useState(id.gameid);

  //===============================================================
  

  const getCategoryGames = async () => {
      console.log("id Game Page",id);
    try {
      const res = await axios.get(`http://localhost:5000/category/${id.categoryid}/games/${id.gameid}`
    //   , {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
      );

      if (res.data.success) {
          

        console.log("Res Game",res.data.game);
        setGame(res.data.game);
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

  const addFav = async (id) => {
    try {
      
      await axios.post(
        `http://localhost:5000/users/${userId}/favgames`,
        {
          favgameid
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!isLoggedIn) {
        history("/login");
      }
   
    } catch (error) {
      console.log(error.response);
    }
  };

  //===============================================================



  useEffect(() => {
    getCategoryGames();
  }, []);

  //===============================================================

  return (
    <div className="gamePage">
      <div className="GPimageContainer">
      
      <div className="GPimage"> <img
                src={`${game.image}`}
                alt={`${game.title}`}
                width="220"
                height="380"
              ></img></div>
             
              </div>
              <div className="mainContent">
              <div className="titleGame" >  
        {game.title}</div>  
        <div className="description" >  
        {game.description}</div> 
        <div className="buttonsClass">
        <Link className="LinK" to={`/games/${id.gameid}/addpost`}>
          
        <div><button>Add Post</button></div>
        
        </Link>
        
        {/* <div><button onClick={addFav}>Add Favourite</button></div> */}
        </div> 
        
      <br />
      {show &&
        game.gamePosts.map((post, index) => (           
            <div key={index} className="cat" >
             
                <Link className="postLink" to={`/games/${id.gameid}/posts/${post._id}`}>
            <div className="postName" ><p className="postTitle">{post.title}</p></div>     

          
            </Link>
            
          </div>
       
        ))
        }
        </div>
      {message && <div>{message}</div>}
    </div>
  );
};

export default Game;
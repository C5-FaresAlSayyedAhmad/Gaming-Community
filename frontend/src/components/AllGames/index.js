import React, {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

import axios from "axios";


//===============================================================

const Games = () => {


  const [games, setGames] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");


  //===============================================================

  const getAllGames = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/games"
        //   , {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
      );

      if (res.data.success) {
        setGames(res.data.games);
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

  useEffect(() => {
    getAllGames();
  }, []);

  //===============================================================

  return (
    <div className="games">
      {show &&
        games.map((game, index) => (
          <div key={index} className="game12">
            <Link className="imageGameLink" to={`/games/${game._id}`}>
              <img
                src={`${game.image}`}
                alt={`${game.title}`}
                width="120"
                height="200"
                className="gameImageAll"
              ></img>
            </Link>

            <div className="gameNameContainer">
              <p className="gameNameText">{game.title}</p>
            </div>
          </div>
        ))}
      {message && <div>{message}</div>}
    </div>
  );
};

export default Games;

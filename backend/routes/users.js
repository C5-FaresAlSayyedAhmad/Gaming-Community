const express = require("express");
const { register , userInfo, userPosts ,userFavGames ,addFavGames ,userComments} = require("../controllers/users");


const usersRouter = express.Router();

usersRouter.post("/", register);
usersRouter.get("/:id", userInfo);
usersRouter.get("/:id/posts", userPosts);
usersRouter.get("/:id/games ", userFavGames);
usersRouter.post("/:id/games", addFavGames);
usersRouter.get("/:id/comments ", userComments);


module.exports = usersRouter;

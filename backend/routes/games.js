const express = require("express");

// Import games controller
const { games ,addNewPost , allGamePosts , getPostById ,updatePost ,deletePost } = require("../controllers/games");

const gamesRouter = express.Router();


gamesRouter.get("/", games);

gamesRouter.post("/:gameId/", addNewPost);
gamesRouter.get("/:gameId/ ", allGamePosts);

gamesRouter.get("/:gameId/:postId", getPostById);
gamesRouter.put("/:gameId/:postId", updatePost);
gamesRouter.delete("/:gameId/:postId", deletePost);

module.exports = gamesRouter;
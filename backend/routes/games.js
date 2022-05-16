const express = require("express");
const { createNewComment } = require("../controllers/comments");

// Import games controller
const { getAllGames ,addNewPost , allGamePosts , getPostById ,updatePost ,deletePost ,createGame } = require("../controllers/games");
const authentication = require("../middleware/authentication");

const gamesRouter = express.Router({mergeParams:true});

const gamesIdRouter = express.Router({mergeParams:true});

const postIdRouter = express.Router({mergeParams:true});

// get request that will get all the games
gamesRouter.get("/", getAllGames);
gamesRouter.post("/", createGame);

//gamesRouter will use the gamesIdRouter when the end point after /games will be /:gamesUd
gamesRouter.use("/:gameid", gamesIdRouter)


// post request that will post a new post 
gamesIdRouter.post("/", authentication ,addNewPost);
// post request that will get all the game posts
gamesIdRouter.get("/", allGamePosts);


//gamesIdRouter will use the postIdRouter when the end point after /:gamesId will be /:postId
gamesIdRouter.use("/posts/:postid", postIdRouter)

// get request that will get a specifec post for a specifec game
postIdRouter.get("/", getPostById);
// post request that will create a new comment 
postIdRouter.post("/comment",authentication, createNewComment)
// put request that will update the post
postIdRouter.put("/",authentication, updatePost);
// delete request that will delete the post
postIdRouter.delete("/", authentication,deletePost);

module.exports = gamesRouter;
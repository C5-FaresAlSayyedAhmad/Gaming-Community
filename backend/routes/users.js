const express = require("express");

// Import users controller
const { register , userInfo, userPosts ,userFavGames ,addFavGames ,deleteFavGames , userComments} = require("../controllers/users");
const authentication = require("../middleware/authentication");


const usersRouter = express.Router({mergeParams:true});

const usersIdRouter  = express.Router({mergeParams:true});

// post request the will create a new account for the user
usersRouter.post("/", register);

//usersRouter will use the usersIdRouter when the end point after /users will be /:userId
usersRouter.use("/:userid" ,usersIdRouter)

// get request that will get the a specifec user infromation
usersIdRouter.get("/", authentication,userInfo);
// get request that will get all the posts for the user
usersIdRouter.get("/posts",authentication, userPosts);
// get request that will get all the posts for the user
usersIdRouter.get("/favgames",authentication ,userFavGames);
// post request that will add favgames for the user 
usersIdRouter.post("/favgames", authentication,addFavGames);
// delete request that will delete the favGame
usersIdRouter.delete("/favgames", authentication,deleteFavGames);
// get request that will get all the comments for the user
usersIdRouter.get("/comments", authentication ,userComments);

module.exports = usersRouter;

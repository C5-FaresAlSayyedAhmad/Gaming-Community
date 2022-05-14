const usersModel = require("../models/users");
const gamePostsModel = require("../models/gamePosts");

const register = (req, res) => {

  const { firstName, lastName, userName, email, password } = req.body;
  const user = new usersModel({
    firstName,
    lastName,
    userName,
    email,
    password,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        user: result,
      });
    })
    .catch((err) => {
      if (err.keyPattern.email == 1) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      else if (err.keyPattern.userName == 1) {
        return res.status(409).json({
          success: false,
          message: `The username is used please try a different one`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });

};

const userInfo = (req, res) => {

 
  let id = req.params.userid
  usersModel
     .findById(id)    
     .select("firstName lastName userName email -_id")
     .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The user is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The User ${id} `,
        user: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });

};

const userPosts = (req, res) => {

  let id = req.params.userid;
  gamePostsModel
    .find({})
    .where('user').equals(req.params.userid)
    .select("title -_id")
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The user is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The user ${id} `,
        game: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });

};

const userFavGames = (req, res) => {};

const addFavGames = (req, res) => {

  
};

const userComments = (req, res) => {};

module.exports = {
  register,
  userInfo,
  userPosts,
  userFavGames,
  addFavGames,
  userComments,
};

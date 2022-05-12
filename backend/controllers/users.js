const usersModel = require("../models/users");

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
        author: result,
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

const userInfo = (req, res) => {};

const userPosts = (req, res) => {};

const userFavGames = (req, res) => {};

const addFavGames = (req, res) => {};

const userComments = (req, res) => {};

module.exports = {
  register,
  userInfo,
  userPosts,
  userFavGames,
  addFavGames,
  userComments,
};

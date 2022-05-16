const usersModel = require("../models/users");
const gamePostsModel = require("../models/gamePosts");
const gamesModel = require("../models/games");

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
      } else if (err.keyPattern.userName == 1) {
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
  let id = req.params.userid;
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
    .where("user")
    .equals(req.params.userid)
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

const userFavGames = (req, res) => {
  let id = req.params.userid;
  usersModel
    .findById(id)
    .select("favGames -_id")
    .populate("favGames", "title -_id")
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
        favGames: result,
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

const deleteFavGames = (req, res) => {
  let userID = req.params.userid;
  const { gameid } = req.body;
  usersModel
    .findOne({ _id: userID })
    .then((result) => {
      if (result.favGames.includes(gameid)) {
        const deletedIndex = result.favGames.indexOf(gameid);
        result.favGames.splice(deletedIndex, 1);
        result.save("done");
        res.status(201).json({
          success: true,
          message: `The Game is Removed`,
          favGames: result.favGames,
        });
      } else {
        res.status(500).json({
          success: false,
          message: `The Game is not in there`,
        });
      }
    })
    .catch((err) => {
      console.log("Here1");
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const addFavGames = (req, res) => {
  let userID = req.params.userid;
  const { gameid } = req.body;

  gamesModel
    .findOne({ _id: gameid })
    .then(() => {
      usersModel
        .findOne({ _id: userID })
        .then((result) => {
          if (result.favGames.includes(gameid)) {
            res.status(500).json({
              success: false,
              message: `The Game is Already Added`,
            });
          } else {
            result.favGames.push(gameid);
            result.save("done");
            res.status(201).json({
              success: true,
              message: `The Game is Added`,
              favGames: result.favGames,
            });
          }
        })
        .catch((err) => {
          console.log("Here1");
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
        });
    })
    .catch((err) => {
      console.log("Here2");
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const userComments = (req, res) => {};

module.exports = {
  register,
  userInfo,
  userPosts,
  userFavGames,
  addFavGames,
  deleteFavGames,
  userComments,
};

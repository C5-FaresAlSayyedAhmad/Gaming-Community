const gamesModel = require("../models/games");
const gamePostsModel = require("../models/gamePosts");
const categoryModel = require("../models/category");

const getAllGames = (req, res) => {
  let id = req.params.categoryid;
  req.params.categoryid
    ? categoryModel
        .findById(id)
        .populate("games", "title -_id")
        .then((result) => {
          if (!result) {
            return res.status(404).json({
              success: false,
              message: `The category is not found`,
            });
          }
          res.status(200).json({
            success: true,
            message: `The Category ${id} `,
            category: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
        })
    : gamesModel
        .find({})
        .populate("gamePosts", "title -_id")
        .then((games) => {
          if (games.length) {
            res.status(200).json({
              success: true,
              message: `All the Games`,
              games: games,
              gamePosts: games.gamePosts,
            });
          } else {
            res.status(200).json({
              success: false,
              message: `No Games Yet`,
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
        });
};

const addNewPost = (req, res) => {
  const gameId = req.params.gameid;

  const { title, description, image } = req.body;
  const newPost = new gamePostsModel({
    title,
    description,
    image,
    user: req.token.userId,
  });

  newPost
    .save()
    .then((result) => {
      gamesModel
        .updateOne({ _id: gameId }, { $push: { gamePosts: result._id } })
        .then(() => {
          res.status(201).json({
            success: true,
            message: `Post added`,
            gamePosts: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: `Server Error`,
            err: err.message,
          });
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

const allGamePosts = (req, res) => {
  let id = req.params.gameid;
  gamesModel
    .findById(id)
    .populate("gamePosts", "title -_id")
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The game is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The Game ${id} `,
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

const getPostById = (req, res) => {
  let id = req.params.postid;
  gamePostsModel
    .findById(id)
    .populate("user", "userName -_id")
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The post is not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The Post ${id} `,
        post: result,
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

const updatePost = (req, res) => {
  const id = req.params.postid;

  gamePostsModel
    .findByIdAndUpdate(id, req.body, { new: true })
    .populate("user", "userName -_id")
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The Post: ${_id} is not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `Post updated`,
        post: result,
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

const deletePost = (req, res) => {};

const createGame = (req, res) => {
  const { title, description } = req.body;
  const game = new gamesModel({
    title,
    description,
  });

  game
    .save()
    .then((result) => {
      res.status(201);
      res.json({
        success: true,
        message: "Game is Added",
        game: result,
      });
    })
    .catch((err) => {
      res.status(500);
      res.send({
        success: false,
        message: "Servcer Error",
        err: err.message,
      });
    });
};

module.exports = {
  getAllGames,
  addNewPost,
  allGamePosts,
  getPostById,
  updatePost,
  deletePost,
  createGame,
};

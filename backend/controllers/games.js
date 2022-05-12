const gamesModel = require("../models/games");
const gamePostsModel = require("../models/gamePosts");

const getAllGames = (req, res) => {};

const addNewPost = (req, res) => {};

const allGamePosts = (req, res) => {};

const getPostById = (req, res) => {};

const updatePost = (req, res) => {};

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

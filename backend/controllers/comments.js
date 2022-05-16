const commentsModel = require("../models/comments");
const gamePosts = require("../models/gamePosts");
const usersModel = require("../models/users");

// This function creates a new comment for a specific article
const createNewComment = (req, res) => {
  const postid = req.params.postid;
  const { comment } = req.body;
  const newComment = new commentsModel({
    comment,
    commenter: req.token.userId,
  });
  newComment
    .save()
    .then((result) => {
      gamePosts
        .updateOne({ _id: postid }, { $push: { comments: result._id } })
        .then(() => {
          usersModel
            .updateOne(
              { _id: req.token.userId },
              { $push: { commentLog: result._id } }
            )
            .then(() => {
              res.status(201).json({
                success: true,
                message: `Comment added`,
                comment: result,
              });
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

module.exports = {
  createNewComment,
};

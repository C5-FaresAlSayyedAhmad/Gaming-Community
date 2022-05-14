const mongoose = require("mongoose");

const gamePostsSchema = new mongoose.Schema({
  title:{type: String, required: true },
  description: { type: String, required: true },
  image: { type: String},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments : [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("GamePost", gamePostsSchema);
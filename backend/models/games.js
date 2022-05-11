const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema({
  title: { type: String, required: true , unique: true},
  description: { type: String, required: true },
  image: { type: String},  
  gamePosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "GamePost" }],
});

module.exports = mongoose.model("Games", gamesSchema);

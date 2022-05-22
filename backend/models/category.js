const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: {type: String},
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: "Games" }],
});

module.exports = mongoose.model("Category", categorySchema);
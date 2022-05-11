const express = require("express");

// Import games controller
const { getAllCategories, getCategory } = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);

categoryRouter.get("/:categoryid", getCategory);

module.exports = categoryRouter;

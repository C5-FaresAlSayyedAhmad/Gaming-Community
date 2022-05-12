const express = require("express");

// Import category controller
const { getAllCategories, createCategory } = require("../controllers/category");

// Import gamesRouter 
const gamesRouter = require("./games");

const categoryRouter = express.Router();

// get request that will get all the categories
categoryRouter.get("/", getAllCategories);
// post request that create category
categoryRouter.post("/", createCategory);


//categoryRouter will use the gamesRouter when the end point after /category will be /:categoryid
categoryRouter.use("/:categoryid", gamesRouter);


module.exports = categoryRouter;

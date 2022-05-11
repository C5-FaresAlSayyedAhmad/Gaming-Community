const express = require("express");

// Import login controller
const  login  = require("../controllers/login");

const loginRouter = express.Router();


loginRouter.post("/", login);

module.exports = loginRouter;
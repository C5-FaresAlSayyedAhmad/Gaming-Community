const express = require("express");

// Import login controller
const  login  = require("../controllers/login");

const loginRouter = express.Router();

// post request the will login the user if he have registered 
loginRouter.post("/", login);

module.exports = loginRouter;
const categoryModel = require("../models/category");

const getAllCategories = (req, res) => {};

const getCategory = (req, res) => {};

const createCategory = (req, res) => {
  const { title, games } = req.body;
  const category = new categoryModel({
    title,
    games,
  });

  category
    .save()
    .then((result) => {
      res.status(201);
      res.json({
        success: true,
        message: "New Category created",
        category: result,
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

module.exports = { getAllCategories, getCategory, createCategory };

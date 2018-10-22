const express = require("express");
const controller = require("../controllers/taskController");

const todolistRoutes = express.Router();

todolistRoutes
    .get("/", controller.index)
    .post("/", controller.create);

module.exports = todolistRoutes;

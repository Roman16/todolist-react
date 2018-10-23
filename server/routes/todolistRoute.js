const express = require("express");
const controller = require("../controllers/taskController");

const todolistRoutes = express.Router();

todolistRoutes
    .get("/", controller.index)
    .post("/", controller.create)
    .delete("/", controller.destroy)
    .put("/", controller.update)
    .post("/moveCard", controller.moveCard)

module.exports = todolistRoutes;

module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  var router = require("express").Router();

  router.get("/", user.findAll);
  router.get("/:id", user.findOne);
  router.post("/", user.create);
  router.delete("/:id", user.delete);
  //router.delete("/", user.deleteAll);
  router.put("/:id", user.update);
  app.use("/api/user", router);
};

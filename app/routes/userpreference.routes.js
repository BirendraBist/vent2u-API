module.exports = (app) => {
    const userpreference = require("../controllers/userpreference.controller.js");
    var router = require("express").Router();
  
    router.get("/", userpreference.findAll);
    router.post("/", userpreference.create);
    router.delete("/:id", userpreference.delete);
    router.get("/:id", userpreference.findOne);
    router.put("/:id", userpreference.update);
  
    app.use("/api/userpreference", router);
  };
  
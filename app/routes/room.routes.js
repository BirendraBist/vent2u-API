module.exports = app => {
    const room = require("../controllers/room.controller.js");
    var router = require("express").Router();

    router.get("/", room.findAll);
    router.post("/", room.create);
    router.delete("/:id", room.delete);
    router.get("/:id", room.findOne);
    router.put("/:id",room.update);
    


    app.use('/api/room', router);
};

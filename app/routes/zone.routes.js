module.exports = app => {
    const zone = require("../controllers/zone.controller.js");
    var router = require("express").Router();

    router.get("/", zone.findAll);
    router.post("/", zone.create);
    router.delete("/:id", zone.delete);
    router.get("/:id", zone.findOne);
    router.put("/:id",zone.update);
   


    app.use('/api/zone', router);
};

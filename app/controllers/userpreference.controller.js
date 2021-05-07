const { response } = require("express");
const db = require("../models");
const Userpreference = db.userpreference;
const Op = db.Sequelize.Op;

// Get All the userpreference
exports.findAll = (req, res) => {
    Userpreference.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving userpreference.",
      });
    });
};
// Find a userpreference with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Userpreference.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving userpreference with id=" + id,
      });
    });
};

//create userpreference
exports.create = (req, res) => {
  const body = req.body;
  const structValid = !body.id || body.temperature|| body.humidity || body.airQuality || body.userId|| body.zoneId;

  if (!structValid) {
    res.status(400).send({
      message: "Must contain: id, userpreferenceName",
    });
    return;
  }

  const userpreference = {
    id: body.id,
    temperature: body.temperature,
    humidity:body.humidity,
    airQuality:body.airQuality,
    userId:body.userId,
    zoneId:body.zoneId
  };

  Userpreference.create(userpreference)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating userpreference.",
      });
    });
};

//Delete userpreference

exports.delete = (req, res) => {
  const id = req.params.id;

  Userpreference.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result === 1) {
        res.send({
          message: "userpreference is deleted successfully!",
        });
      }
      res.status(404).send({ message: "userpreference does not exists." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing userpreference.",
      });
    });
};

// Update a userpreference by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Userpreference.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "userpreference was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update userpreference with id=${id}. Maybe userpreference was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating userpreference with id=" + id,
      });
    });
};

// Delete all the userpreference

exports.deleteAll = (req, res) => {
    Userpreference.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} userpreference are deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all userpreferences.",
      });
    });
};

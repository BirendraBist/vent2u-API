const { response } = require("express");
const db = require("../models");
const Zone = db.zone;
const Op = db.Sequelize.Op;

// Get All the Zone
exports.findAll = (req, res) => {
  Zone.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Zone.",
      });
    });
};
// Find a Zone with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Zone.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Zone with id=" + id,
      });
    });
};

//create
exports.create = (req, res) => {
  const body = req.body;
  const structValid = (!body.id||  body.zoneName)

  if (!structValid) {
    res.status(400).send({
      message: "Must contain: roomId, zoneName",
    });
    return;
  }

  const Zone = {
    room_id: body.room_id,
    zomeName: body.zoneName,
  };

  Zone.create(zone)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating Zone.",
      });
    });
};

//Delete

exports.delete = (req, res) => {
  const id = req.params.id;

  Zone.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result === 1) {
        res.send({
          message: "Zone is deleted successfully!",
        });
      }
      res.status(404).send({ message: "Zone does not exists." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing Zone.",
      });
    });
};

// Update a Zone by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Zone.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Zone was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Zone with id=${id}. Maybe Zone was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Zone with id=" + id,
      });
    });
};

const { response } = require("express");
const db = require("../models");
const Room = db.room;
const Op = db.Sequelize.Op;

// Get All the room
exports.findAll = (req, res) => {
  Room.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving room.",
      });
    });
};
// Find a room with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Room.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Room with id=" + id,
      });
    });
};

//create
exports.create = (req, res) => {
  const body = req.body;
  const structValid = !body.id || body.roomName || body.userId;

  if (!structValid) {
    res.status(400).send({
      message: "Must contain: id, roomName",
    });
    return;
  }

  const room = {
    id: body.id,
    roomName: body.roomName,
    userId: body.userId,
  };

  Room.create(room)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating room.",
      });
    });
};

//Delete

exports.delete = (req, res) => {
  const id = req.params.id;

  Room.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result === 1) {
        res.send({
          message: "Room is deleted successfully!",
        });
      }
      res.status(404).send({ message: "Room does not exists." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing Room.",
      });
    });
};

// Update a Room by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Room.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Room was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Room with id=${id}. Maybe room was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Room with id=" + id,
      });
    });
};

// Delete all the rooms

exports.deleteAll = (req, res) => {
  Room.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Rooms are deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Rooms.",
      });
    });
};

const { response } = require("express");
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

//create
exports.create = (req, res) => {
  const body = req.body;
  const structValid = !body.id || body.userName || body.password;

  if (!structValid) {
    res.status(400).send({
      message: "Must contain: id, userName",
    });
    return;
  }

  const user = {
    userName: body.userName,
    password: body.password,
  };

  User.create(user)
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

  User.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result === 1) {
        res.send({
          message: "User is deleted successfully!",
        });
      }
      res.status(404).send({ message: "User does not exists." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing User.",
      });
    });
};

// User a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe Zone was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

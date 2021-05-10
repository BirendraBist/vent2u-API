const { response } = require("express");
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const authService = require("../utils/jwtAuth.js")
const jwt = require("jsonwebtoken");
const md5 = require("md5");

// Get All the user
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
// Find a user with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id,
      });
    });
};

//create
exports.create = (req, res) => {
  const body = req.body;
  const structValid = !body.id || body.userName|| body.password;

  if (!structValid) {
    res.status(400).send({
      message: "Must contain: id, userName",
    });
    return;
  }

  const user = {
    id: body.id,
    userName: body.userName,
    password:body.password
  };

  User.create(user)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating user.",
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
          message: "user is deleted successfully!",
        });
      }
      res.status(404).send({ message: "user does not exists." });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing user.",
      });
    });
};

// Update a user by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "user was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
};

// Delete all the User

exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users are deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Users.",
      });
    });
};
//

exports.authenticate = (req, res) => {
  const password = md5(req.body.password + process.env.HASH_SALT)
  User.findOne({ where: { userName: req.body.userName, password: password } })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Incorrect username or password" })
        return
      }
      const token = authService.createToken(data.userName, data.id);
      res.send({ token });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Error on authenticating user."
      });
    });
};




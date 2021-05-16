require("dotenv").config();
const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

exports.create = (req, res) => {
  if (!req.body.userName || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const user = {
    userName: req.body.userName,
    password: req.body.password,
  };
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        console.log(err);
      }
      user.password = hash;
      User.create(user)
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the settings.",
          });
        });
    });
  });
};

exports.login = (req, res) => {
  User.findOne({ where: { userName: req.body.userName } })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: "Invalid UserName" });
      } else {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, results) {
            if (results) {
              const token = jwt.sign(
                {
                  userName: user.userName,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "86000s" },
                function (err, token) {
                  res.status(200).json({
                    message: "Authencation is successful!!",
                    token: token,
                  });
                }
              );
            } else {
              res.status(401).json({
                message: "invalid Credential  !",
              });
            }
          }
        );
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
};

// exports.login = (req, res) => {
//   User.findOne({ where: { userName: req.body.userName } })
//     .then((user) => {
//       if (user === null) {
//         res.status(401).json({ message: "Invalid UserName" });
//       } else {
//         bcrypt.compare(
//           req.body.password,
//           user.password,
//           function (err, results) {
//             if (results) {
//               const token = jwt.sign(
//                 {
//                   userName: user.userName,
//                 },
//                 "secret",
//                 function (err, token) {
//                   res.status(200).json({
//                     message: "Authencation is successful!!",
//                     token: token,
//                   });
//                 }
//               );
//             } else {
//               res.status(401).json({
//                 message: "invalid Credential  !",
//               });
//             }
//           }
//         );
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({
//         message: "Something went wrong!",
//       });
//     });
// };

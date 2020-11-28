require("dotenv").config();
const Users = require('../models/Users'),
  bcrypt = require('bcryptjs'),
  jwt = require('jsonwebtoken'),
  { isValidPwd } = require('../utils/isValidPwd');

// @ POST /api/users/register
// desc create new users
// access public
exports.postRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirm } = req.body;
    // check for all fields being filled in
    if (!firstName || !lastName || !email || !password || !confirm) {
      res.json({ msg: "All fields must be filled" })
    }
    // check for proper email format
    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      res.json({ msg: "Must Enter Valid Email" })
    }
    // make sure password and confirm match
    if (password !== confirm) {
      res.json({ msg: "Password and Confirm must match" });
    }
    // if password is valid
    // if password and confirm matches
    if (isValidPwd(password) && password === confirm) {
      await Users
        .findOne({ email })
        .then(user => {
          if (user) return res.json({ msg: "User with that email exists" });
          const newUser = new Users({ firstName, lastName, email, password });
          newUser.save();
          res
            .status(201)
            .json({ msg: "User created" })
        }).catch(err => console.error(err.message));
    }
  } catch (err) {
    res
      .status(500)
      .json({
        msg: "Somthing went wrong"
      })
  }
}

// @ POST /api/users/login
// desc login users
// access public
exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    await Users.findOne({ email })
      .then(user => {
        if (!user) res.json({ msg: "User doesn't exist." })
        bcrypt
          .compare(password, user.password)
          .then(result => {
            if (result) {
              const token = jwt.sign({
                id: user._id,
                firstName: user.firstName,
                email: user.email,
                role: user.role
              }, process.env.JWT_SECRET, { expiresIn: "30d" })
              res
                .status(200)
                .json({
                  msg: "You're in",
                  token,
                  user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                  }
                })
            } else {
              res.status(403).json({ msg: "User info doesn't match." })
            }
          }).catch(err => console.log("Uh oh"))
      })
  } catch (err) { }
}

// @ PUT /api/users/:id
// desc update users
// access private
exports.putUpdateUser = async (req, res) => {
  try {
    const { firstName, lastName, password } = req.body;
    const { id } = req.params;
    const user = await Users.findById(id);
    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.password = password || user.password;
      user.save()
        .then(savedUser => {
          const token = jwt.sign({
            id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email,
            role: savedUser.role
          }, process.env.JWT_SECRET, { expiresIn: "30d" })
          res
            .status(201)
            .json({
              msg: "Updated User",
              user: {
                id: savedUser._id,
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                role: savedUser.role
              },
              token
            })
        });
    }
  } catch (err) { }
}


// @ DELETE /api/users/:id
// desc delete users
// access private
exports.deleteUser = async (req, res) => {
  try {
    res
      .status(200)
      .json({
        msg: "auth delete"
      })
  } catch (err) { }
}
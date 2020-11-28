const Users = require('../models/Users'),
  bcrypt = require('bcryptjs'),
  { isValidPwd } = require('../utils/isValidPwd');

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
exports.postLogin = async (req, res) => {
  try {
    res
      .status(201)
      .json({
        msg: "auth login"
      })
  } catch (err) { }
}
exports.putUpdateUser = async (req, res) => {
  try {
    res
      .status(204)
      .json({
        msg: "auth update"
      })
  } catch (err) { }
}
exports.deleteUser = async (req, res) => {
  try {
    res
      .status(200)
      .json({
        msg: "auth delete"
      })
  } catch (err) { }
}
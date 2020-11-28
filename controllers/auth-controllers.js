const Users = require('../models/Users');

exports.postRegister = async (req, res) => {
  try {
    res
      .status(201)
      .json({
        msg: "auth register"
      })
  } catch (err) { }
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
const router = require('express').Router();
const {
  postRegister,
  postLogin,
  putUpdateUser,
  deleteUser
} = require('../controllers/auth-controllers');

router
  .route("/register")
  .post(postRegister);

router
  .route("/login")
  .post(postLogin);

router
  .route("/:id")
  .put(putUpdateUser)
  .delete(deleteUser);

module.exports = router;
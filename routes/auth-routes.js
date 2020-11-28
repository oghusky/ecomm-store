const router = require('express').Router();
const {
  postRegister,
  postLogin,
  putUpdateUser,
  deleteUser
} = require('../controllers/auth-controllers');

// @ POST /api/users/register
// desc create new users
// access public
router
  .route("/register")
  .post(postRegister);

// @ POST /api/users/login
// desc login users
// access public
router
  .route("/login")
  .post(postLogin);

// @ PUT /api/users/:id
// desc update users
// access private

// @ DELETE /api/users/:id
// desc delete users
// access private
router
  .route("/:id")
  .put(putUpdateUser)
  .delete(deleteUser);

module.exports = router;
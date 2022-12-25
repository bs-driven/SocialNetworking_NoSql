const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');
  // Exported functions from user controller
router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

  router
.route('/:userId/friends/:friendId')
.post(addFriend),

router
.route('/:userId/friends/:friendId')
.delete(removeFriend)


module.exports = router;

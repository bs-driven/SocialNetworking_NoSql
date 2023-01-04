const router = require('express').Router();
const {
  getUser,
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
  .get(getUser)
  .post(createUser);

router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

  router
.route('/:userId/friends/:friendId')
.put(addFriend),

router
.route('/:userId/friends/:friendId')
.delete(removeFriend)


module.exports = router;

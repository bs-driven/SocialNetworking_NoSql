const { User, Thought } = require('../models');

const userController = {
     // Get all users
     getUser(req, res) {
        User.find()
        .then((userData)=> res.json(userData))
        .catch((err) => res.status(500).json(err));
    },

     // Get a single user
     getSingleUser(req,res) {
        User.findOne({_id: req.pramas.userId})
        .select('-__v')
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },

     // create a User
     createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },

      // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that id' })
              : Thought.deleteMany({ _id: { $in: user.thought }})
          )
          .then(() => res.json({ message: 'user has been deleted!' }))
          .catch((err) => res.status(500).json(err));
      },

      // add a friend
      addFriend(req,res){
        User.findOneAndUpdate(
          {_id: req.params.userId},
          {$pull:{friends: req,params,friendId}},
          {new: true}
        ) .then((friend) =>{
          !friend
            ? res.status(400).json({ message: 'no user found with that id' })
            : res.status(200).json(friend)
        }) .catch((err)=> res.status(500).json(err));
      },

      // remove a friend
      removeFriend(req,res){
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId }},
          { new: true}
      )
      .then((friend) => {
          !friend
          ? res.status(400).json({ message: 'no user found with that id' })
          : res.status(200).json(friend)
      })
      .catch((err) => res.status(500).json(err));
  
      }


 
};

module.exports = userController;

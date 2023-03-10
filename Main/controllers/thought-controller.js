const { Thought, User } = require('../models');

const thoughtController = {
    // Get all thoughts
    getThought(req, res) {
        Thought.find()
        .then((thoughtData)=> res.json(thoughtData))
        .catch((err) => res.status(500).json(err));
    },

    // Get a single thought
    getSingleThought(req,res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },
    // create a thought
    createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => res.json(thought))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },

      // Update a thought
      updateThought(req, res) {
          Thought.findOneAndUpdate(
              { _id: req.params.thoughtId },
              { $set: req.body },
              { runValidators: true, new: true }
              )
              .then((thought) =>
              !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
              )
              .catch((err) => res.status(500).json(err));
            },
            
            // Delete a thought
          deleteThought(req, res) {
            Thought.findOneAndDelete({ _id: req.params.thoughtId })
              .then((thought) =>
                !thought
                  ? res.status(404).json({ message: 'No thought with that id' })
                  : User.deleteMany({ _id: { $in: thought.thought }})
              )
              .then(() => res.json({ message: 'Thought has been deleted!' }))
              .catch((err) => res.status(500).json(err));
          },
            
        };

module.exports = thoughtController;

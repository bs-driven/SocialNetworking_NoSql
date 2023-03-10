const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  updateThought,
  createThought,
  deleteThought,
  // Exported functions from thought-controller
} = require('../../controllers/thought-controller');

// Use exported functions from line 3 to create routes
router
  .route('/')
  .get(getThought)
  .post(createThought);

router
  .route('/:thoughtId')
  .put(updateThought)
  .get(getSingleThought)
  .delete(deleteThought)
  
module.exports = router;

const express = require('express');
const router = express.Router();

//@route  api/posts
//@desc   test route
//@access public route
router.get('/', (req, res) => res.send('Posts Test Route'));

module.exports = router;

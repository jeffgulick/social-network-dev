const express = require('express');
const router = express.Router();

//@route  api/profile
//@desc   test route
//@access public route
router.get('/', (req, res) => res.send('Profile Test Route'));

module.exports = router;

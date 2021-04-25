const express = require('express');
const router = express.Router();

//@route  api/users
//@desc   test route
//@access public route
router.get('/', (req, res) => res.send('Users Test Route'));

module.exports = router;

const express = require('express');
const router = express.Router();

//@route  api/auth
//@desc   test route
//@access public route
router.get('/', (req, res) => res.send('Auth Test Route'));

module.exports = router;

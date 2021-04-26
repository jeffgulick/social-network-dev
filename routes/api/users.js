const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

//@route  api/users
//@desc   user register route
//@access public route
router.post(
  '/',
  //backend user input validation using express-validator
  [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    //checking for errors, sends validation error details if any above validation rules are broken
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('Users Test Route');
  }
);

module.exports = router;

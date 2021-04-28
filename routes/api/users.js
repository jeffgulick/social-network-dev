const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');

const User = require('../../models/User');

//@route  api/users
//@desc   user register route
//@access public route
router.post(
  '/',
  //backend user input validation using express-validator
  [
    check('name', 'Name is Required').not().isEmpty().trim(),
    check('email', 'Please enter a valid email')
      .isEmail()
      .normalizeEmail()
      .trim(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    //checking for errors, sends validation error details if any above validation rules are broken
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructuring request body object
    const { name, email, password } = req.body;

    try {
      //checks for existing email in db
      const user = await User.findOne({ email: email });
      if (user) {
        res.status(400).json({ errors: { msg: 'user already exists' } });
      }
      //grabs gravatar if one is available
      const profileImage = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
      //creating new database instance
      user = new User({
        name,
        email,
        password,
        profileImage,
      });
      // needed to complete register route
      //see if user exists
      //get gravatar
      //encrypt password
      //return json webToke

      res.send(name);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const normalize = require('normalize-url');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

//@route  api/users
//@desc   user register route
//@access public route
router.post(
  '/',
  //backend user input validation using express-validator
  [
    check('name', 'Name is Required').not().isEmpty().trim().toUpperCase(),
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
      //checks for existing user saved in db
      let user = await User.findOne({ email: email });
      if (user) {
        res.status(400).json({ errors: [{ msg: 'user already exists' }] });
      } else {
        //grabs gravatar if one is available
        const avatar = normalize(
          gravatar.url(email, { s: '200', r: 'pg', d: 'mm' }),
          { forceHttps: true }
        );

        // creating new user object to save to db
        user = new User({
          name,
          email,
          avatar,
          password,
        });

        //creating salt round and then hashing/encrypting password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //saving user object with hashed password to db
        await user.save();
        res.send(`User, ${name} is now registered`);
      }
      //return json webToke
    } catch (error) {
      console.error(error);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;

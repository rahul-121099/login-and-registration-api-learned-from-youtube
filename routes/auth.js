const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  validationForRegistration,
  validationForLogin,
} = require("../validation");

//register route
router.post("/register", async (req, res) => {
  //validate with Joi
  const { error } = validationForRegistration(req.body);

  //checking for error
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  //check if the user email has already exists or not
  const emailAlreadyExist = await User.findOne({ email: req.body.email });

  if (emailAlreadyExist) {
    res.status(400).send("Email already exists");
  }

  //hash user password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //creating a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  //save user in database if not error
  try {
    const newSavedUser = await user.save();
    res.send(newSavedUser);
  } catch (err) {
    res.status(403).send(err);
  }
});

//login route
router.post("/login", async (req, res) => {
  //validate user before login
  const { error } = validationForLogin(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  //check for user does not exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("User does not exist");
  }

  //else compare the user credentials with the db
  const comparedPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!comparedPassword) {
    return res.send("Password does not match");
  }

  //Generate json web token for authentication
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET_KEY);
  res.header("authentication", token).send(token);
  res.send("Logged in");
});

module.exports = router;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjNlM2YzMjcxNjhlNDA3ZjQwZDY0MTAiLCJpYXQiOjE1OTc5MTY3MTV9.rX8X4bipqQVvtxGxsAKjVO2DDbd85Fy0xDzpHunx1kE
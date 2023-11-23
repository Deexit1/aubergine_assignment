/**
 * Controller for handling authentication-related operations.
 * @module authController
 */

const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 * Register a new user.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response indicating the success of user registration.
 */
exports.registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Email address is already registered." });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create and save an user
    const user = new User({ email, username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    // We can put any log monitoring request here instead of console log.
    console.log(err);
    res.status(500).json({ message: "Error registering an user." });
  }
};

/**
 * Authenticate and log in a user.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - JSON response containing a JWT token for the authenticated user and indicating the sucess of user login.
 */
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        // Create a unique token which should be valid until 1 week.
        const token = jwt.sign({ userid: user._id }, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        res
          .status(200)
          .json({ message: "User created successfully !.", token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    // We can put any log monitoring request here instead of console log.
    console.log("Error", err);
    res.status(500).json({ message: "Error logging in" });
  }
};

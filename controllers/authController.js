/**
 * Controller for handling authentication-related operations.
 * @module authController
 */

const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const logger = require("../config/loggerConfig");

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
    if (existingUser) {
      logger.error(`Email address is already registered: ${email}`);
      return res
        .status(400)
        .json({ message: "Email address is already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create and save an user
    const user = new User({ email, username, password: hashedPassword });
    await user.save();

    logger.info(`User registered successfully: ${email}`);
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    // We can put any log monitoring request here instead of console log.
    logger.error(`Error registering an user: ${err}`);
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

        logger.info(`User logged in successfully: ${email}`);
        res
          .status(200)
          .json({ message: "User logged in successfully !.", token });
      } else {
        logger.error(`Invalid credentials provided for ${email}`);
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      logger.error(`Invalid credentials provided for ${email}`);
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    // We can put any log monitoring request here instead of console log.
    logger.error(`Error logging in: ${err}`);
    res.status(500).json({ message: "Error logging in" });
  }
};

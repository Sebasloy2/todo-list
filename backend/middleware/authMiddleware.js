const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Get the user associated with the token
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      // If no user is found, return an error
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Set the user on the request object for use in subsequent middleware functions
    req.user = user;

    // Call the next middleware function
    next();
  } catch (error) {
    // If an error occurs, return an error
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;

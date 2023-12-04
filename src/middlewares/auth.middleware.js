const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        auth: false,
        msg: 'No token provided',
      });
    }

    
    if (!process.env.JWT_KEY) {
      return res.status(500).json({
        auth: false,
        msg: 'Internal server error: missing secret',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.id;
    next();

  } catch (error) {
    res.status(401).json({
      auth: false,
      message: 'Invalid token',
    });
  }
};

module.exports = authenticateToken;
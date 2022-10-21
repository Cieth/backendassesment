const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const authHeader = req.header('authorization');

  if (authHeader == null) {
    return res.status(401).json({ error: 'Access-denied' });
  }

  try {
    const { id } = jwt.verify(authHeader, process.env.SECRET_KEY);
    req.user = id;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid-token' });
  }
};

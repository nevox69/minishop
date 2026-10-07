const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.status(401).json({ message: "User Not saved" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decode.userId;

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = protect;

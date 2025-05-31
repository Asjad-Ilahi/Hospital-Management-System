const jwt = require("jsonwebtoken");
require("dotenv").config();

const nurseAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (decoded.userType !== "Nurse") {
      return res.status(403).json({ message: "Access denied: Nurses only" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = nurseAuth;
const jt = require("jsonwebtoken");

require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decode = jt.verify(token, process.env.key);
    if (decode) {
      const adminID = decode.adminID;
      req.body.adminID = adminID;
      next();
    } else {
      res.send("login first");
    }
  } else {
    res.send("login first");
  }
};
module.exports = { authenticate };

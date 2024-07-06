const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).send("Access Denied");

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.SCERET_TOKEN);
    console.log("Verified User ID:", verified._id); 
    req.user = verified._id;
    next();
  } catch {
    res.status(401).send("Token invalid");
  }
};

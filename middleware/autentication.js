const jwt = require("jsonwebtoken");

const verificateAuth = (req, res, next) => {
  let token = req.get("token");
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        mensaje: "Token error",
        err
      });
    }

    req.user = decoded.data;
    //data comes from token's generation in login.js
    next();
  });
};

let verificateRol = (req, res, next) => {
  let rol = req.user.role;

  console.log(rol);

  if (rol !== "ADMIN") {
    return res.status(401).json({
      mensaje: "Role not allowed!"
    });
  }

  next();
};

module.exports = { verificateAuth, verificateRol };

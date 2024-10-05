const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config/keys");

const isAuth = async (req, res, next) => {
  try {
    //* get the authorization value from request headers
    const authorization = req.headers.authorization
      ? req.headers.authorization.split(" ")
      : null;
    //get token if authorization exist in headers
    const token =
      authorization && authorization.length > 1 ? authorization[1] : null;

    if (token) {
      //verify token
      const payload = jwt.verify(token, jwtSecretKey);
      //* set user details to request if payload exist
      if (payload) {
        req.user = {
          _id: payload._id,
          email: payload.email,
          role: payload.role,
        };
        next();
      } else {
        res.code = 401;
        throw new Error("Unauthorized");
      }
    } else {
      res.code = 400;
      throw new Error("Token is required");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = isAuth;

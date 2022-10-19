const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const authorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw createError(401, `important header is Missing`);
    }

    const bearerToken = token.split(" ")[1];
    const decodedtoken = jwt.verify(bearerToken, "Employee123");
    req.employee = decodedtoken.userId;

    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { authorization };

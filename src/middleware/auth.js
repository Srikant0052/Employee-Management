const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const authorization = async (req, res, next) => {
  try {
    // const token = req.headers.authorization;

    const token = req.body.token;

    if (!token) {
      throw createError(401, `Important header is Missing`);
    }

    // const bearerToken = token.split(" ")[1];
    const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
    req.employee = decodedtoken.userId;
    req.employeeRole = decodedtoken.role;

    next();
  } catch (error) {
    next(error)
  }
};
module.exports = { authorization };

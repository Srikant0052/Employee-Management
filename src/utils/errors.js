const createError = require("http-errors");

const notFound = (req, res, next) => {
  next(createError(404, `The page you are looking for is not found`));
};

const errorHandler = (err, req, res, next) => {
  res.status(err.staus || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
};

module.exports = {
  notFound,
  errorHandler,
};

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  // Determining status code
  let statusCode = err.statusCode === 200 ? 500 : res.statusCode;

  if (err.code === "23505") {
    statusCode = 400;
  }
  res.status(statusCode);

  // Sending error response
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

module.exports = errorMiddleware;

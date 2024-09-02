const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  // Determining status code
  const statusCode = err.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Sending error response
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

module.exports = errorMiddleware;

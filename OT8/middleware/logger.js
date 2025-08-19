const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const metodo = req.method;
  const url = req.originalUrl;

  console.log(`[${timestamp}] ${metodo} ${url}`);

  next();
};

module.exports = logger;

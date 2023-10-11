import logger from "../utils/log.js";

const logMiddleware = (req, res, next) => {
  const startTime = Date.now();

  next();

  const ms = Date.now() - startTime;
  logger.info(
    `${req.method}, ${req.originalUrl}, Status: ${res.statusCode}, duration: ${ms} ms`
  );
};

export default logMiddleware;

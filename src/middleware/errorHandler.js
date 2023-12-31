const errorHandler = (err, req, res, next) => {
  if (err.name !== "NotFoundError") {
    console.error(err);
    res.status(500).json({ message: "Oops, something went wrong!" });
  }
};

export default errorHandler;

const hendleMongooseError = (error, data, next) => {
  const { name, code } = error;

  console.log("name", name);
  console.log("code", code);
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;

  error.status = status;
  next();
};

module.exports = hendleMongooseError;

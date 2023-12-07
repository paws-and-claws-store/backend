const { ctrlErrorHandler } = require("../../helpers");

module.exports = {
  register: ctrlErrorHandler(require("./register")),
};

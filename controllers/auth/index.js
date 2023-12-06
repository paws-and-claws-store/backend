const { ctrlErrorHandler } = require("../../helpers");

module.exports = {
  register: ctrlErrorHandler(require("./register")),
  login: ctrlErrorHandler(require("./login")),
  getCurrent: ctrlErrorHandler(require("./getCurrent")),
  refresh: ctrlErrorHandler(require("./refresh")),
  logout: ctrlErrorHandler(require("./logout")),
};

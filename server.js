const mongoose = require("mongoose");

const app = require('./app');

const {DB_HOST, PORT = 4000} = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server was started on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1)
  });
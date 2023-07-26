const mongoose = require("mongoose");

const app = require('./app');

const DB_HOST = 'mongodb+srv://admin:4HGCqHtPuO2VKGQF@cluster0.lqiopbh.mongodb.net/';

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server was started on port 3000`);
    });
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1)
  });
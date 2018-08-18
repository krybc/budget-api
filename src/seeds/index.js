const mongoose = require('mongoose');
mongoose.set('bufferCommands', false);
require('../config/database');

let UsersSeed = require('./users');


async function SeedsRun() {
  Promise.all([
    await UsersSeed.load()
  ]).then(values => {
    mongoose.connection.close(function(){
      console.log("Mongoose default connection is disconnected due to application termination");
      process.exit(0);
    });
  }).catch(errors => {

  });
}

mongoose.connection.on('connected', function() {
  let result = SeedsRun();
});
const mongoose = require('mongoose')

async function connection(){
    try{
        mongoose.connect("mongodb://localhost/Krishna", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Connected to database");
        }).catch((err) => {
            console.error("Error connecting to the database", err);
        });
    }
    catch(e){
        console.log(e)
    }
  }
  module.exports = connection;
const {Movies, Critics} = require('./models')


async function insertingData(ratings,moviesData){
    try{
      await Movies.insertMany(moviesData);
      console.log("Movies inserted")
      await Critics.insertMany(ratings)
      console.log("Critics inserted")
  
    }
    catch(e){
      console.log(e)
    }
  }

  module.exports = insertingData;
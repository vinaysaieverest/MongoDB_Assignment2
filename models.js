const mongoose = require("mongoose");
const movies =  new mongoose.Schema({
    movieId:{
        type:String,
        //required:true
        
    },
    movieTitle:{
        type:String,
        //required : true 
    }

})
const critics = new mongoose.Schema({
    movieId:{
        type:String,
        //required : true
        
    },
    criticName:{
        type:String,
        // required:true
        
    },
    originalScore:{
        type:Number
    }
  
})
const Movies = mongoose.model("Movies",movies);
const Critics = mongoose.model("Critics",critics);
module.exports = {Movies,Critics};


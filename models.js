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
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Movies"
        
    },
    criticName:{
        type:String,
        // required:true
        
    },
    originalScore:{
        type:Number
    },

        
  
})
const users = new mongoose.Schema({
    movieId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Movies"
        
    },
    rating:{
        type:Number
    },
    userId:{
        type:String
    }
})
const Movies = mongoose.model("Movies",movies);
const Critics = mongoose.model("Critics",critics);
const Users = mongoose.model("Users",users);
module.exports = {Movies,Critics,Users};


const express = require('express');
const router = express.Router();
const {Movies, Critics} = require('../models')

router.get('/',async(req,res)=>{
    try{
        const results = await Movies.aggregate([
            {
                $lookup:{
                    from :"critics",
                    localField:"movieId",
                    foreignField:"movieId",
                    as:"Critics_Reviews",
                    pipeline:[
                        {
                            $limit:2
                        }
                    ]
                    
                }},
                {
                $project:{
                    _id :0,
                    __v : 0,
                    movieId:0,
                    "Critics_Reviews._id":0,
                    "Critics_Reviews.__v":0,
                    "Critics_Reviews.movieId":0

                }}
               
            
        ])
        //console.log(results)
        res.json(results)
        console.log(JSON.stringify(results, null, 2));

    }
    
    catch(e){
        console.log(e)
    }
})
module.exports = router
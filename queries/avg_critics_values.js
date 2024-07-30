const express = require('express');
const router = express.Router();
const {Movies, Critics,Users} = require('../models')

router.get('/',async(req,res)=>{
    try{
        const results = await Movies.aggregate([
            {
                $lookup:{
                    from :"critics",
                    localField:"_id",
                    foreignField:"movieId",
                    as:"Critics_Reviews",
                    pipeline:[
                        {
                            $limit:2
                        }
                    ]
                    
                }},
                
               
            
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
//const { result } = require('lodash')
const {Movies, Critics} = require('./models')
async function test(){
    try{
        const results = await Movies.aggregate([
            {
                $lookup:{
                    from :"critics",
                    localField:"movieId",
                    foreignField:"movieId",
                    as:"Critics_Reviews"
                }
            },
            {$limit:1}
        ])
        //console.log(results)
        //res.json(results)
        console.log(JSON.stringify(results, null, 2));

    }
    
    catch(e){
        console.log(e)
    }
}
module.exports = test
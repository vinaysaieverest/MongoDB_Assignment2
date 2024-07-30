// const {Movies, Critics,Users} = require('./models')


// async function insertingData(ratings,moviesData,userdata){
//     try{
//       await Movies.insertMany(moviesData);
//       console.log("Movies inserted")
//       await Critics.insertMany(ratings)
//       console.log("Critics inserted")
//       await Users.insertMany(userdata)
//       console.log("Users data inserted")
  
//     }
//     catch(e){
//       console.log(e)
//     }
//   }

//   module.exports = insertingData;


// const { Movies, Critics, Users } = require('./models');

// async function insertingData(ratings, moviesData, userdata) {
//   try {
//     for (const movie of moviesData) {
//       const newMovie = new Movies(movie);
//       await newMovie.save();

//     }
//     console.log("All movies inserted");
//     for (const rating of ratings) {
//       const newRating = new Critics(rating);
//       await newRating.save();
//     }
//     console.log("All critics inserted");
//     for (const user of userdata) {
//       const newUser = new Users(user);
//       await newUser.save();

//     }
//     console.log("All user data inserted");

//   } catch (e) {
//     console.log(e);
//   }
// }

// module.exports = insertingData;



const { Movies, Critics, Users } = require('./models');

async function insertingData(ratings, moviesData, userdata) {
  try {
      for (const movie of moviesData) {
      const newMovie = new Movies(movie);
      await newMovie.save();
      const movieRatings = ratings.filter(rating => rating.movieId === movie.movieId);
      for (const rating of movieRatings) {
        rating.movieId = newMovie._id; 
        const newRating = new Critics(rating);
        await newRating.save();
      }
      const movieUsers = userdata.filter(user => user.movieId === movie.movieId);
      for (const user of movieUsers) {
        user.movieId = newMovie._id; 
        const newUser = new Users(user);
        await newUser.save();
      }
    }

    console.log("All data inserted");

  } catch (e) {
    console.log(e);
  }
}

module.exports = insertingData;


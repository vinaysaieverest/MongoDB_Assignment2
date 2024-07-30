const readCSVFile = require('./readCSV')
const data = ('./c.csv')
const data1 = ('./movies.csv')
const data2 = ('./user_reviews.csv')
const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require("mongoose")
const e = require('express');
const {Movies,Critics,Users} = require('./models')
const connection = require('./connection')
const insertingData = require('./insertingData')
const all_critics_reviews = require('./queries/queries')
const all_reviews = require('./queries/avg_critics_values')
const express = require("express")
const app = express()

async function vinay() {
  try {
    const vinay = await readCSVFile(data);
    const moviesData = await readCSVFile(data1)
    const userdata = await readCSVFile(data2)
    const ratings = vinay.map((a) => {
      let ele = a.originalScore;
      let newrating;
      if(ele.includes('/')) {
        const [numerator, denominator] = ele.split('/');
        newrating = (parseFloat(numerator) / parseFloat(denominator))*10;
    }
    else if(ele === "")
        newrating =  null;
    else if (ele === "FIVE STARS"){
      newrating = 10

    }
    else if (ele === "+3 out of -4..4"){
      newrating = 7.5
    }
    
    else switch (ele) {
        case "A+":
          newrating = 10;
          break;
        case "A":
          newrating = 9;
          break;
        case "A-":
          newrating = 8;
          break;
        case "B+":
          newrating = 7;
          break;
        case "B":
          newrating = 6;
          break;
        case "B-":
          newrating = 5;
          break;
        case 'C+':
          newrating = 4;
          break;
        case "C":
          newrating = 3;
          break;
        case "-C":
          newrating = 2
          break;
        default:
          newrating = 1;
          break;
    }
    return {...a,originalScore: newrating}
    });
    await insertingData(ratings,moviesData,userdata)
  } catch (e) {
    console.log(e);
  }
}

const queries = async () => {
  try {
      app.use("/api/",all_critics_reviews );
      app.use('/api/a',all_reviews)
  } catch (e) {
      console.log(e);
  }
};



connection()
vinay()
insertingData() 
queries()
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

import { constrainedMemory } from 'process';
//const a = require('./readCSV')
const data = './c.csv';
const data1= './movies.csv'
const fs = require('fs');
const csv = require('csv-parser');
const e = require('express');
//const {Movies,Critics} = require('./models')

function readCSVFile(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

async function vinay() {
  try {
    const criticsdata = await readCSVFile(data);
    const Moviesdata = await readCSVFile(data1);
    
    const modifiedCrtics = criticsdata.map((a) => {
      let ele = a.originalScore;
      let newRating;
      if (ele.includes('/')) {
        const [numerator, denominator] = ele.split('/');
        newRating = (parseFloat(numerator) / parseFloat(denominator)) * 10;
      } else if (ele === "") {
        newRating = "Not reviewed";
      } else if (ele === "FIVE STARS") {
        newRating = 10;
      } else if (ele === "3 out of -4..4") {
        newRating = 7.5;
      } else {
        switch (ele) {
          case "A+":
            newRating = 10;
            break;
          case "A":
            newRating = 9;
            break;
          case "A-":
            newRating = 8;
            break;
          case "B+":
            newRating = 7;
            break;
          case "B":
            newRating = 6;
            break;
          case "B-":
            newRating = 5;
            break;
          case 'C+':
            newRating = 4;
            break;
          case "C":
            newRating = 3;
            break;
          case "-C":
            newRating = 2;
            break;
          default:
            newRating = 1;
        }
      }
      return { ...a, originalScore: newRating };
    });
    console.log(modifiedCrtics);
  } catch (e) {
    console.log(e);
  }
}
// async function insertingData(){
//   try{
//     //await Movies.insertMany(modifiedCrtics)
//     //await Critics.insertMany(Moviesdata)
//   }
//   catch(e){
//     console.log(e)
//   }
// }
vinay();
//insertingData();

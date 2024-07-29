const a = require('./readCSV')
const data = ('./c.csv')
const fs = require('fs');
const csv = require('csv-parser');
const e = require('express');

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
    const vinay = await readCSVFile(data);
    const ratings = vinay.map((a) => {
      let ele = a.originalScore;
      if(ele.includes('/')) {
        const [numerator, denominator] = ele.split('/');
        return (parseFloat(numerator) / parseFloat(denominator))*10;
    }
    else if(ele === "")
        return "Not reviewd";
    else if (ele === "FIVE STARS"){
      return 10

    }
    else if (ele === "3 out of -4..4"){
      return 7.5
    }
    
    else switch (ele) {
        case "A+":
          return 10;
        case "A":
          return 9;
        case "A-":
          return 8;
        case "B+":
          return 7;
        case "B":
          return 6;
        case "B-":
          return 5;
        case 'C+':
          return 4;
        case "C":
          return 3;
        case "-C":
          return 2
        default:
          return 1;
    }
    });
    console.log(ratings);
  } catch (e) {
    console.log(e);
  }
}



//readCSVFile()
vinay()

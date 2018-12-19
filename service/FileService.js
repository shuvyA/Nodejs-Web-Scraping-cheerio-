


var csv = require('csv-parser')
var fs = require('fs')
var request = require('request')

function loadCSV(fileCsv) {

    var animals = [];

    return new Promise((resolve) => {
        fs.createReadStream(fileCsv)
            .pipe(csv())
            .on('data', function (data) {
                animals.push(data)
                
            })
            .on('end', function () {
                // console.log('str', dataStr);
                // console.log(JSON.parse(JSON.stringify(animals)))
                resolve(JSON.parse(JSON.stringify(animals)))
            })
    })
}


function download(url, fileName){
    return new Promise((resolve, reject) => {
        request.head(url, (err, res, body) => {
          request(url)
          .pipe(fs.createWriteStream(fileName))
            .on('close', resolve)
            .on('error', reject)
        });
    })
  };
  

module.exports = {
    loadCSV,
    download,
}
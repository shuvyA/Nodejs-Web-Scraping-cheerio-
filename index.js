console.log('Hello node');

// fs.createReadStream('RareAnimals.csv')
//   .pipe(csv())
//   .on('data', function (data) {
//     console.log('Name: %s Age: %s', data.name, data.count)
//   })



// var fs = require('fs');
// var parse = require('csv-parser');


var csv = require('csv-parser')
var fs = require('fs')
var FileService = require('./service/FileService.js');
var ImgService = require('./service/ImgService.js');
var PDFService = require('./service/PDFService.js');



// var imgsUrl = [];

FileService.loadCSV('./RareAnimals.csv')
  .then(animals => {


    var prms = animals.map(animal => {

      return ImgService.suggestImgs(animal.name)
        .then((urlImg) => {
          animal.url = urlImg;
          return animal
        })
    });
    return Promise.all(prms)
  })
  .then(animalsWithImgUrls => {

    var prmsAnimals = animalsWithImgUrls.map((animal, idx) => {
      return FileService.download(animal.url, `${idx}img.jpg`)
    })
    return Promise.all(prmsAnimals).then(_ => animalsWithImgUrls)
  })
  .then(animals => {
    // console.log({animals})
    PDFService.buildAnimalsPDF(animals, 'SaveTheAnimals.pdf')
    // TODO: Use the PDFService to build the animals
  })


//  ImgService.suggestImgs('car').then((data)=>{

// console.log(data,'data for car ');

//  })

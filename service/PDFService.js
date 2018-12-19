var PDFDocument = require('pdfkit');
var fs = require('fs')


function buildAnimalsPDF(animals, filename = 'SaveTheAnimals.pdf') {
    // # Create a document 
    var doc = new PDFDocument()

    // # Pipe its output somewhere, like to a file or HTTP response 
    // # See below for browser usage 
    doc.pipe(fs.createWriteStream(filename))

    animals.forEach((animal, idx) => {

        doc.image(`${idx}img.jpg`, {
            fit: [250, 300],
            align: 'center',
            valign: 'center'
        });

        doc.addPage()
    });



    doc.save()
    doc.end()

}

module.exports = {
    buildAnimalsPDF,
}

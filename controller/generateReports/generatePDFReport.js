// reportGenerators/pdfGenerator.js
const PDFDocument = require('pdfkit');
const fs = require('fs');

const generatePDFReport = (characterData) => {
  const doc = new PDFDocument();
  const pdfReportPath = 'character_report.pdf';

  doc.fontSize(16).text('Character Report', { align: 'center' });

  characterData.forEach((character, index) => {
    doc.text(`Character ${index + 1}: ${character.name}`);
    doc.text(`Age: ${character.age}`);
    doc.text(`Gender: ${character.gender}`);
    doc.text(`Occupation: ${character.occupation}`);
    doc.text(`Relations: ${character.relations}`);

   // doc.moveDown();

    character.photos.forEach((pic,i)=>{
      const imagePath = `./public/uploads/${pic}`; // Update path
      doc.image(imagePath, 100, doc.x + 15 * (i+5), { width: 20});
      doc.moveDown();
    })
    
   
  });

  doc.pipe(fs.createWriteStream(pdfReportPath));
  doc.end();

  return pdfReportPath;
};

module.exports = generatePDFReport;

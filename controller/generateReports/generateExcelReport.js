// reportGenerators/excelGenerator.js
const ExcelJS = require('exceljs');
const fs = require('fs');

const generateExcelReport = (characterData) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Character Report');
  const excelReportPath = 'character_report.xlsx';

  // Add headers
  worksheet.addRow(['Character Name', 'Age', 'Gender','Occupation','Relations', 'Photos']);

  // Add data
  characterData.forEach((character) => {
    //const images = character.photos.join(', ');
    const relations = character.relations.join(', ');
    worksheet.addRow([character.name, character.age,character.gender,character.occupation,relations]);
  });

  characterData.forEach((character, index) => {
    character.photos.forEach((imageFileName, imgIndex) => {
      const imagePath = `./public/uploads/${imageFileName}`; // Update path
      const imageId = workbook.addImage({
        filename: imagePath,
        extension: 'png',
      });
    

      worksheet.addImage(imageId, `${String.fromCharCode(70+imgIndex)} ${index * 2 + 2}`);
    });
  });

  workbook.xlsx.writeFile(excelReportPath)
    .then(() => {
      console.log('Excel report generated');
    })
    .catch((err) => {
      console.error('Error generating Excel report:', err);
    });

  return excelReportPath;
};

module.exports = generateExcelReport;

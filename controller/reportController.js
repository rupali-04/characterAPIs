// reportGenerators/index.js
const generatePDFReport = require('./generateReports/generatePDFReport');
const generateExcelReport = require('./generateReports/generateExcelReport');
const generateCSVReport = require('./generateReports/generateCsvReport');
const Character = require('../model/character');

exports.generateReports = async(req, res) => {
  const characterData = await Character.find().sort({date: -1});;

  // Generate PDF, Excel, and CSV reports

  const pdfReport = generatePDFReport(characterData);
  const excelReport = generateExcelReport(characterData);
  const csvReport = generateCSVReport(characterData);

  res.json({
    pdfReport,
    excelReport,
    csvReport,
  });
};


exports.generateCharacterReport = async(req, res) => {
    
    var characterData = await Character.findById(req.params.id)
     // Make sure user is character owner
     if (characterData.user.toString() !== req.user.id) {
        return res.status(400).send("User not Allowed to generate Report....");
    }
    var Arr = [];
    Arr.push(characterData); 

   
  
    // Generate PDF, Excel, and CSV reports
  
    const pdfReport = generatePDFReport(Arr);
    const excelReport = generateExcelReport(Arr);
    const csvReport = generateCSVReport(Arr);
  
    res.json({
      pdfReport,
      excelReport,
      csvReport,
    });
  };
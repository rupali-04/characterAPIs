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
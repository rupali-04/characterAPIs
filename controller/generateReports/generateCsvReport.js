// reportGenerators/csvGenerator.js
const fs = require('fs');
const fastcsv = require('fast-csv');

const generateCSVReport = (characterData) => {
  const csvReportPath = 'character_report.csv';

  const csvStream = fastcsv.format({ headers: true });

  // Write CSV headers
  csvStream.pipe(fs.createWriteStream(csvReportPath));

  // Write CSV data
  characterData.forEach((character) => {
    const row = {
      'Character Name': character.name,
      Age: character.age,
      Gender: character.gender,
      Occupation: character.occupation,
      Relations: character.relations.join(', '),
      Photos: character.photos.join(', ')
    };
    csvStream.write(row);
  });

  csvStream.end();

  return csvReportPath;
};

module.exports = generateCSVReport;
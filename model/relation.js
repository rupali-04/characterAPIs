const mongoose = require('mongoose');

const relationSchema = new mongoose.Schema({
    idCharacter:{
    type: objectId,
    required: true
  },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  });
  
  const Relation = mongoose.model('Relation', relationSchema);
  
  module.exports = Relation
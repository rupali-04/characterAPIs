const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relationSchema = new mongoose.Schema({
    idCharacter:{
      type: Schema.Types.ObjectId,
      ref: 'Characters',
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
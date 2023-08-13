const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
},
  age: {
    type: Number,
    required: true
  },
	photos: {
    type: Array,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  occupation: {
    type: String,
    required: true
  },
  relations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Relations'
  }],
 
});


const Character = mongoose.model('Character', characterSchema);

module.exports = Character;

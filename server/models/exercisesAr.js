const mongoose = require('mongoose')
const exSchema = new mongoose.Schema({
  bodyPart: {
    type: String,
    required: [true, 'bodyPart is required'],
  },
  instructions: {
    type: Array,
    required: [true, 'instructions is required'],
  },
  secondaryMuscles: {
    type: Array,
    required: [true, 'secondaryMuscles is required'],
  },
  equipment: {
    type: String,
    required: [true, 'equipment is required'],
  },
  gifUrl: {
    type: String,
    required: [true, 'gifUrl is required'],
  },
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  target: {
    type: String,
    required: [true, 'target is required'],
  }
})

const Exercises = mongoose.model('exercisesAr', exSchema)
module.exports = Exercises
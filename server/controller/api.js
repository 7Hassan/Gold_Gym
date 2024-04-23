const Exercises = require('../models/exercises')
const ExercisesAr = require('../models/exercisesAr')
const catchError = require('../Errors/catch')

exports.filterExercises = catchError(async (req, res, next) => {
  const { id, bodyPart, target, equipment, lang } = req.body
  let exercises, query = {};
  if (id) query._id = id;
  if (bodyPart) query.bodyPart = bodyPart;
  if (target) query.target = target;
  if (equipment) query.equipment = equipment;
  if (lang == 'ar') exercises = await ExercisesAr.find(query);
  else exercises = await Exercises.find(query);
  res.status(200).json({ success: true, data: exercises })
})


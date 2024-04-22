const Exercises = require('../models/exercises')
const ExercisesAr = require('../models/exercisesAr')
const catchError = require('../Errors/catch')

exports.filterExercises = catchError(async (req, res, next) => {
  const { id, bodyPart, target, equipment } = req.body
  const languageCode = req.cookies.i18next;
  console.log('🚀 ~ languageCode:', languageCode)
  let exercises, query = {};
  if (id) query._id = id;
  if (bodyPart) query.bodyPart = bodyPart;
  if (target) query.target = target;
  if (equipment) query.equipment = equipment;
  if (languageCode == 'ar') exercises = await ExercisesAr.find(query);
  else exercises = await Exercises.find(query);
  res.status(200).json({ success: true, data: exercises })
})


const Exercises = require('../models/exercises')
const catchError = require('../Errors/catch')


exports.exercises = catchError(async (req, res, next) => {
  const exercises = await Exercises.find({});
  res.status(200).json({ success: true, data: exercises })
})

exports.filterExercises = catchError(async (req, res, next) => {
  const { id, bodyPart, target, equipment } = req.body
  const query = {};
  if (id && id !== 'all') query._id = id;
  if (bodyPart && bodyPart !== 'all') query.bodyPart = bodyPart;
  if (target && target !== 'all') query.target = target;
  if (equipment && equipment !== 'all') query.equipment = equipment;
  const exercises = await Exercises.find(query);
  res.status(200).json({ success: true, data: exercises })
})


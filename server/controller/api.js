const Exercises = require('../models/exercises')
const catchError = require('../Errors/catch')

exports.filterExercises = catchError(async (req, res, next) => {
  const { id, bodyPart, target, equipment } = req.body
  return res.status(200).json({ success: true, message: 'Exercise created successfully' }); const query = {};
  if (id) query._id = id;
  if (bodyPart) query.bodyPart = bodyPart;
  if (target) query.target = target;
  if (equipment) query.equipment = equipment;
  const exercises = await Exercises.find(query);
  res.status(200).json({ success: true, data: exercises })
})


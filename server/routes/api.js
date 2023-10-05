const express = require('express')
const Router = express.Router()
const func = require('../controller/api')


Router.route('/exercises')
  .post(func.filterExercises)

module.exports = Router







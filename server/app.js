const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression')
const AppError = require('./Errors/classError')
const errorHandler = require('./Errors/errorHandling')
const dotenv = require('dotenv')
const mongoSanitize = require('express-mongo-sanitize')
const xssClean = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
const helmet = require('helmet');
const app = express();

dotenv.config({ path: './.env' }); 
app.use(express.json())
app.enable('trust proxy')
app.use(morgan('tiny'))
app.use(compression())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cors({ credentials: true, origin: 'http://localhost:5173/' }));
app.use(cors());
app.use(mongoSanitize())
app.use(xssClean())
app.use(hpp())
app.use(cookieParser()); //? to access a cookie requests


//? setup express message
app.use(async (req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});



app.use('/api', require('./routes/api'));
app.all('*', (req, res, next) => next(new AppError('not found', 404)))
app.use(errorHandler)
module.exports = app

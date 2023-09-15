var express = require('express')
const Pool = require('pg').Pool
const { tokenvalidation } = require('../libs/tokenvalidation')
let jwtSecretKey = process.env.DEV_TOKEN_KEY;
let secretKey = process.env.DEV_SECRET_KEY;
let jwtExpire = process.env.DEV_TOKEN_EXPIRES_IN;
require('dotenv').config()

const pool = new Pool({
  user: process.env.DEV_DATABASE_DATA_USERNAME,
  host: process.env.DEV_DATABASE_DATA_HOST,
  database: process.env.DEV_DATABASE_DATA_NAME,
  password: process.env.DEV_DATABASE_DATA_PASSWORD,
  port: process.env.DEV_DATABASE_DATA_PORT,
})

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (token == null) {
//     return res.sendStatus(401);
//   }
//   if(!tokenvalidation(token))
//   {
//     var output = {
//       "status" : false,
//       "message": "unrecognize"
//       }

//       res.contentType('application/json').status(200);
//       var valued = JSON.stringify(output);
//       return res.send(valued);
//   }
//   next();
// };

var router = express.Router()
// router.use(authenticateToken)

//Generate token
router.get("/", function (req, res, next) {
  const dataToken = {
    "var":""
  }
  const token = jwt.sign({ dataToken }, jwtSecretKey, { expiresIn: jwtExpire });
  return res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR,
      error: HttpStatus.getReasonPhrase(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR)
  })
});

//Get categories
router.post("/get-all", function (req, res, next) {
  pool.query('SELECT * FROM fn_arn_logs_access_get_all()', (err, results) => {
      if (err) {
        throw err
      }
      var output = {
          "status" : true,
          "message": "Get data successfull",
          "data": results.rows
      }
      // console.log(output)
      res.contentType('application/json').status(200)
      var valued = JSON.stringify(output)
      res.send(valued)
  })
})

// Submit category
router.post("/submit", async function (req, res, next) {
  const { in_name, in_path } = req.body
 
  pool.query('call sp_arn_logs_access_create($1,$2)', [in_name, in_path], (err, results) => {
    if (err) {
      throw err
    }

    var output = {
      "status" : true,
      "message": "Data has been saved"
    }

    res.contentType('application/json').status(200)
    var valued = JSON.stringify(output)
    res.send(valued)
  })
})

module.exports = router
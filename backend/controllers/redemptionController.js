var express = require('express')
const Pool = require('pg').Pool
const { tokenvalidation } = require('../libs/tokenvalidation')
require('dotenv').config()

const pool = new Pool({
  user: process.env.DEV_DATABASE_USERNAME_CGR,
  host: process.env.DEV_DATABASE_HOST_CGR,
  database: process.env.DEV_DATABASE_NAME_CGR,
  password: process.env.DEV_DATABASE_PASSWORD_CGR,
  port: process.env.DEV_DATABASE_PORT_CGR,
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

router.post("/get-remaining", function (req, res, next) {
  pool.query('SELECT * FROM fn_remaining()', (err, results) => {
      if (err) {
        throw err
      }
      var output = {
          "status" : true,
          "message": "Get data successfull",
          "data": results.rows[0].fn_remaining
      }

      res.contentType('application/json').status(200)
      var valued = JSON.stringify(output)
      res.send(valued)
  })
})

router.post("/submit", async function (req, res, next) {
  const in_qr = req.body.in_qr

  pool.query('CALL sp_submit_qr($1)', [in_qr], (err, results) => {
    if (err) {
      var output = {
        "status" : false,
        "message": "Barcode has been scanned"
      }
  
      res.contentType('application/json').status(200)
      var valued = JSON.stringify(output)
      res.send(valued)
    }

    var output = {
      "status" : true,
      "message": "Barcode accepted"
    }

    res.contentType('application/json').status(200)
    var valued = JSON.stringify(output)
    res.send(valued)
  });
});

module.exports = router
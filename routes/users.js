var express = require('express');
var router = express.Router();

const Apec = require('../models/dbConnection');

// GET users listing
router.get('/', async function (req, res, next) {
  const result = await Apec.query('SELECT * FROM users')
  res.json(result);
});

router.post('/', async function (req, res, next) {
  let {firstname, lastname, email, pwd, has_profile, gender} = req.body
  await Apec.query (
    `INSERT INTO users 
      (firstname, lastname, email, pwd, has_profile, gender, creation_date)
      VALUES (
        ${firstname},
        ${lastname}, 
        ${email}, 
        ${pwd}, 
        ${has_profile}, 
        ${gender}, 
        current_timestamp)`
  )
  const result = await Apec.query('SELECT * FROM users')
  res.json (result)  
});





module.exports = router;

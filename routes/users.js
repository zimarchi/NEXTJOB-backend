var express = require('express');
var router = express.Router();

const Apec = require('../models/dbConnection');
const bcrypt = require('bcrypt');

// GET users listing
router.get('/', async function (req, res, next) {
  const result = await Apec.query('SELECT * FROM users')
  res.json(result);
});

//SIGN UP
router.post('/signup', async (req, res) => { 
  const { firstname, lastname, email, pwd, gender } = req.body; 

  try { 
    const utilisateurExiste = await Apec.query( 'SELECT * FROM users WHERE email = $1', [email] );
    if (utilisateurExiste.rows.length > 0) { // Vérifier si l'utilisateur existe déjà
      return res.status(400).send('Cet utilisateur existe déjà.')
    } 
    // Hasher le mot de passe
    const pwdHash = bcrypt.hashSync(pwd, 10);
    
    // Créer l'utilisateur dans la base de données
    const resultat = await Apec.query ('INSERT INTO users (firstname, lastname, email, pwd, has_profile, gender, creation_date) VALUES ($1, $2, $3, $4, false, $5, current_timestamp)', [firstname, lastname, email, pwdHash, gender])
    
    //res.status(201).send('Compte créé avec succès.');
    const result = await Apec.query('SELECT * FROM users')
    res.json (result)
    }

  catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur.');
  }
  

});







module.exports = router;

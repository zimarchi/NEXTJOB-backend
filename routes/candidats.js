var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const Nextjob = require('../models/dbConnection');

// GET liste des candidats
router.get('/', async function (req, res, next) {
  const result = await Nextjob.query('SELECT * FROM candidats')
  res.json(result);
});

//SIGN UP
router.post('/signup', async (req, res) => { 
  const { firstname, lastname, email, pwd } = req.body; 

  try { 
    const candidatExiste = await Nextjob.query( 'SELECT * FROM candidats WHERE email = $1', [email] );
    if (candidatExiste.rows.length > 0) { // Vérifier si le candidat existe déjà
      return res.status(400).send('Cet utilisateur existe déjà.')
    } 
    // Hasher le mot de passe
    const pwdHash = bcrypt.hashSync(pwd, 5);
    
    // Créer le candidat dans la base de données
    const creation = await Nextjob.query ('INSERT INTO candidats (firstname, lastname, email, pwd, creation_date) VALUES ($1, $2, $3, $4, current_timestamp)', [firstname, lastname, email, pwdHash])
    
    //Vérification du résultat :
    // méthode 1 : res.status(201).send('Compte créé avec succès.');
    // méthode 2 :
    const result = await Nextjob.query('SELECT * FROM candidats')
    res.json (result)
    }

  catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur.');
  }

});







module.exports = router;

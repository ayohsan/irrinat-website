const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const sendMail = require('./send_mail'); // Importer le fichier send_mail.js

// Middleware pour parser les requêtes POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servir des fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'trafnosleep')));

// Route pour le formulaire de contact
app.post('/send_email', (req, res) => {
  sendMail(req.body, (error, info) => {
    if (error) {
      return res.status(500).send('Erreur lors de l\'envoi de l\'email : ' + error.message);
    }
    // Rediriger vers la page de succès après envoi
    res.redirect('/success.html');
  });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur à l'écoute sur http://localhost:${port}`);
});

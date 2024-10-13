const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Ajout de CORS
const app = express();
const PORT = 3000;

// Middleware pour analyser les requêtes JSON
app.use(express.json());
app.use(cors()); // Utiliser CORS

// Route pour sauvegarder les noms dans backup.txt
app.post('/save', (req, res) => {
    const { nom1, nom2 } = req.body;

    // Format d'écriture dans le fichier
    const entry = `${new Date().toISOString()} - ${nom1} ❤️ ${nom2}\n`;

    // Ajouter l'entrée dans backup.txt
    fs.appendFile('backup.txt', entry, (err) => {
        if (err) {
            console.error('Erreur lors de l\'enregistrement :', err);
            return res.status(500).send('Erreur lors de l\'enregistrement');
        }
        res.send('Enregistrement réussi');
    });
});

// Nouvelle route pour récupérer les entrées
app.get('/entries', (req, res) => {
    fs.readFile('backup.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier :', err);
            return res.status(500).send('Erreur lors de la lecture du fichier');
        }
        res.send(data); // Renvoie le contenu du fichier
    });
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

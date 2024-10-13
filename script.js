// Sélection des éléments HTML
const calculateBtn = document.getElementById('calculateBtn');
const clearBtn = document.getElementById('clearBtn');
const shareBtn = document.getElementById('shareBtn');
const resultDiv = document.getElementById('result');

// Fonction pour envoyer les noms au serveur et les sauvegarder dans backup.txt
function saveNames(nom1, nom2) {
    fetch('http://localhost:3000/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nom1, nom2 }),
            mode: 'cors',
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Erreur :', error));
}

// Fonction principale pour calculer la compatibilité
function calculateCompatibility() {
    const nom1 = document.getElementById('nom1').value.trim();
    const nom2 = document.getElementById('nom2').value.trim();

    if (!nom1 || !nom2) {
        alert("Veuillez entrer les deux noms.");
        return;
    }

    // Enregistre les noms dans le serveur
    saveNames(nom1, nom2);

    // Génération de la compatibilité
    let loveScore = Math.floor(Math.random() * (100 - 40 + 1)) + 40;

    // Affichage des résultats
    resultDiv.style.padding = "20px";
    resultDiv.innerHTML = `
        <h2><span style="color: white;">${nom1}</span> ❤️ 
        <span style="color: white;">${nom2}</span></h2>
        <p>Compatibilité : ${loveScore}%</p>
    `;

    // Message personnalisé selon le score
    let message = loveScore <= 50 ? "Il reste encore une chance !" :
        loveScore <= 60 ? "Vous êtes faits l'un pour l'autre." :
        loveScore <= 75 ? "Un couple parfait !" :
        "Pour toujours ❤️";

    resultDiv.innerHTML += `<p>${message}</p>`;
}

// Fonction pour effacer les champs de texte et le résultat
function clearFields() {
    document.getElementById('nom1').value = '';
    document.getElementById('nom2').value = '';
    resultDiv.innerHTML = ''; // Efface aussi le résultat
}

// Fonction pour partager le résultat sous forme d'image
function shareResult() {
    html2canvas(resultDiv).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        if (navigator.share) {
            const blob = dataURLToBlob(imgData);
            const file = new File([blob], 'resultat_amour.png', { type: 'image/png' });

            navigator.share({
                    title: 'Résultat du Love Calculator',
                    text: 'Voici ma compatibilité amoureuse ! https://condor30.github.io/love.io/',
                    files: [file],
                }).then(() => console.log('Partage réussi'))
                .catch(error => console.error('Erreur de partage', error));
        } else {
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'resultat_amour.png';
            link.click();
        }
    });
}

// Fonction pour convertir une image data URL en Blob
function dataURLToBlob(dataURL) {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

// Ajout des événements sur les boutons
calculateBtn.addEventListener('click', calculateCompatibility);
clearBtn.addEventListener('click', clearFields);
shareBtn.addEventListener('click', shareResult);

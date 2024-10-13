const calculateBtn = document.getElementById('calculateBtn');
const clearBtn = document.getElementById('clearBtn');
const shareBtn = document.getElementById('shareBtn');
const resultDiv = document.getElementById('result');

const resultsCache = {};

function normalizeName(name) {
    return name.trim().toLowerCase();
}

function calculateCompatibility() {
    const nom1 = normalizeName(document.getElementById('nom1').value);
    const nom2 = normalizeName(document.getElementById('nom2').value);

    if (!nom1 || !nom2) {
        alert("Veuillez entrer les deux noms.");
        return;
    }

    const key = `${Math.min(nom1, nom2)}&${Math.max(nom1, nom2)}`;

    let loveScore;

    // Option : Désactiver le cache pour forcer un nouveau calcul
    const forceRecalculate = true;

    if (!forceRecalculate && resultsCache[key]) {
        loveScore = resultsCache[key];
    } else {
        loveScore = Math.floor(Math.random() * (100 - 40 + 1)) + 40;
        resultsCache[key] = loveScore;
    }

    resultDiv.style.padding = "20px";
    resultDiv.innerHTML = `
        <h2><span style="color: white;">${nom1}</span> ❤️ 
        <span style="color: white;">${nom2}</span></h2>
        <p>Compatibilité : ${loveScore}%</p>
    `;

    let message;
    if (loveScore <= 50) {
        message = "Il reste encore une chance !";
    } else if (loveScore <= 60) {
        message = "Vous êtes faits l'un pour l'autre.";
    } else if (loveScore <= 75) {
        message = "Un couple parfait !";
    } else {
        message = "Pour toujours ❤️";
    }

    resultDiv.innerHTML += `<p>${message}</p>`;
}

function clearFields() {
    document.getElementById('nom1').value = '';
    document.getElementById('nom2').value = '';
    resultDiv.innerHTML = '';
    resultDiv.style.padding = "0";
}

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
                .catch((error) => console.error('Erreur de partage', error));
        } else {
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'resultat_amour.png';
            link.click();
        }
    });
}

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

calculateBtn.addEventListener('click', calculateCompatibility);
clearBtn.addEventListener('click', clearFields);
shareBtn.addEventListener('click', shareResult);

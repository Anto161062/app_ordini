document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById('app');
    const appBucato = document.getElementById('appBucato');

    // Lista delle essenze con formati e prezzi
    const essenze = [
        { nome: "Vigna Rossa", formati: [ {ml: "200ml", prezzo: 20}, {ml: "500ml", prezzo: 35}, {ml: "1000ml", prezzo: 60} ], immagine: 'immagini/vigna_rossa.png' },
        { nome: "Citri Fructus", formati: [ {ml: "200ml", prezzo: 20}, {ml: "500ml", prezzo: 35}, {ml: "1000ml", prezzo: 60} ], immagine: 'immagini/citri_fructus.png' },
        { nome: "Lavanda Menta", formati: [ {ml: "200ml", prezzo: 20}, {ml: "500ml", prezzo: 35}, {ml: "1000ml", prezzo: 60} ], immagine: 'immagini/lavanda_menta.png' },
        { nome: "Oltremare", formati: [ {ml: "200ml", prezzo: 20}, {ml: "500ml", prezzo: 35}, {ml: "1000ml", prezzo: 60} ], immagine: 'immagini/oltremare.png' },
        { nome: "Risveglio", formati: [ {ml: "200ml", prezzo: 20}, {ml: "500ml", prezzo: 35}, {ml: "1000ml", prezzo: 60} ], immagine: 'immagini/risveglio.png' },
        { nome: "Sapientia", formati: [ {ml: "200ml", prezzo: 20}, {ml: "500ml", prezzo: 35}, {ml: "1000ml", prezzo: 60} ], immagine: 'immagini/sapientia.png' },
        { nome: "VaniLime", formati: [ {ml: "200ml", prezzo: 20}, {ml: "500ml", prezzo: 35}, {ml: "1000ml", prezzo: 60} ], immagine: 'immagini/vanilime.png' }
    ];

    // Creazione della lista delle essenze
    essenze.forEach((essenza, essenzaIndex) => {
        const essenzaDiv = document.createElement('div');
        essenzaDiv.classList.add('essenza-item');

        // Colonna sinistra: immagine e nome della profumazione
        const leftDiv = document.createElement('div');
        leftDiv.classList.add('left-column');
        leftDiv.innerHTML = `<img src="${essenza.immagine}" alt="${essenza.nome}">
                             <h3>${essenza.nome}</h3>`;

        // Colonna destra: formati e prezzi
        const rightDiv = document.createElement('div');
        rightDiv.classList.add('right-column');

        essenza.formati.forEach((formato, formatoIndex) => {
            const formatoDiv = document.createElement('div');
            formatoDiv.classList.add('formato-item');
            formatoDiv.innerHTML = `
                <p>${formato.ml} - €${formato.prezzo}</p>
                <input type="number" id="quantita-${essenzaIndex}-${formatoIndex}" min="0" placeholder="Quantità">
            `;
            rightDiv.appendChild(formatoDiv);
        });

        essenzaDiv.appendChild(leftDiv);
        essenzaDiv.appendChild(rightDiv);
        app.appendChild(essenzaDiv);
    });

    // Lista dei profumatori per la biancheria con formati e prezzi
    const profumatoriBucato = [
        { nome: "03 Fiori", formati: [ {ml: "250ml", prezzo: 12}, {ml: "500ml", prezzo: 18} ], immagine: 'immagini/03_fiori.png' },
        { nome: "10 Respiro", formati: [ {ml: "250ml", prezzo: 12}, {ml: "500ml", prezzo: 18} ], immagine: 'immagini/10_respiro.png' },
        { nome: "04 Tramonto", formati: [ {ml: "250ml", prezzo: 12}, {ml: "500ml", prezzo: 18} ], immagine: 'immagini/04_tramonto.png' }
    ];

    // Creazione della lista dei profumatori per la biancheria
    profumatoriBucato.forEach((profumazione, profumazioneIndex) => {
        const profumazioneDiv = document.createElement('div');
        profumazioneDiv.classList.add('essenza-item');

        // Colonna sinistra: immagine e nome del profumatore
        const leftDiv = document.createElement('div');
        leftDiv.classList.add('left-column');
        leftDiv.innerHTML = `<img src="${profumazione.immagine}" alt="${profumazione.nome}">
                             <h3>${profumazione.nome}</h3>`;

        // Colonna destra: formati e prezzi
        const rightDiv = document.createElement('div');
        rightDiv.classList.add('right-column');

        profumazione.formati.forEach((formato, formatoIndex) => {
            const formatoDiv = document.createElement('div');
            formatoDiv.classList.add('formato-item');
            formatoDiv.innerHTML = `
                <p>${formato.ml} - €${formato.prezzo}</p>
                <input type="number" id="quantita-bucato-${profumazioneIndex}-${formatoIndex}" min="0" placeholder="Quantità">
            `;
            rightDiv.appendChild(formatoDiv);
        });

        profumazioneDiv.appendChild(leftDiv);
        profumazioneDiv.appendChild(rightDiv);
        appBucato.appendChild(profumazioneDiv);
    });

    // Funzione per calcolare il totale
    document.getElementById('calcolaTotale').addEventListener('click', function() {
        let totaleGlobale = 0;

        // Calcola il totale per le essenze
        essenze.forEach((essenza, essenzaIndex) => {
            essenza.formati.forEach((formato, formatoIndex) => {
                const quantita = parseInt(document.getElementById(`quantita-${essenzaIndex}-${formatoIndex}`).value);
                if (quantita > 0) {
                    totaleGlobale += formato.prezzo * quantita;
                }
            });
        });

        // Calcola il totale per i profumatori per la biancheria
        profumatoriBucato.forEach((profumazione, profumazioneIndex) => {
            profumazione.formati.forEach((formato, formatoIndex) => {
                const quantita = parseInt(document.getElementById(`quantita-bucato-${profumazioneIndex}-${formatoIndex}`).value);
                if (quantita > 0) {
                    totaleGlobale += formato.prezzo * quantita;
                }
            });
        });

        document.getElementById('totaleGlobale').textContent = `Totale Globale: €${totaleGlobale}`;
    });
});


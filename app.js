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

    // Lista dei profumatori per bucato con formati e prezzi
    const bucato = [
        { nome: "03 Fiori", formati: [ {ml: "250ml", prezzo: 12}, {ml: "500ml", prezzo: 20} ], immagine: 'immagini/03_fiori.png' },
        { nome: "10 Respiro", formati: [ {ml: "250ml", prezzo: 12}, {ml: "500ml", prezzo: 20} ], immagine: 'immagini/10_respiro.png' },
        { nome: "04 Tramonto", formati: [ {ml: "250ml", prezzo: 12}, {ml: "500ml", prezzo: 20} ], immagine: 'immagini/04_tramonto.png' }
    ];

    // Funzione per creare la lista di essenze o profumatori
    function creaListaProdotti(prodotti, targetElement) {
        const prodottiDiv = document.createElement('div');
        prodotti.forEach((prodotto, prodottoIndex) => {
            const prodottoDiv = document.createElement('div');
            prodottoDiv.classList.add('essenza-item');

            // Colonna sinistra: immagine e nome del prodotto
            const leftDiv = document.createElement('div');
            leftDiv.classList.add('left-column');
            leftDiv.innerHTML = `<img src="${prodotto.immagine}" alt="${prodotto.nome}">
                                 <h3>${prodotto.nome}</h3>`;

            // Colonna destra: formati e prezzi
            const rightDiv = document.createElement('div');
            rightDiv.classList.add('right-column');

            prodotto.formati.forEach((formato, formatoIndex) => {
                const formatoDiv = document.createElement('div');
                formatoDiv.classList.add('formato-item');
                formatoDiv.innerHTML = `
                    <p>${formato.ml} - €${formato.prezzo}</p>
                    <input type="number" id="quantita-${prodottoIndex}-${formatoIndex}" min="0" placeholder="Quantità">
                `;
                rightDiv.appendChild(formatoDiv);
            });

            prodottoDiv.appendChild(leftDiv);
            prodottoDiv.appendChild(rightDiv);
            prodottiDiv.appendChild(prodottoDiv);
        });

        targetElement.appendChild(prodottiDiv);
    }

    // Creazione delle liste
    creaListaProdotti(essenze, app);
    creaListaProdotti(bucato, appBucato);

    // Bottone per calcolare il totale (valido per entrambe le liste)
    const buttonDiv = document.createElement('div');
    buttonDiv.innerHTML = `
        <button id="calcolaTotale" class="btn">Calcola Totale</button>
        <h3 id="totaleGlobale">Totale Globale: €0</h3>
    `;
    app.appendChild(buttonDiv);

    // Funzione per calcolare il totale
    document.getElementById('calcolaTotale').addEventListener('click', function() {
        let totaleGlobale = 0;

        [...essenze, ...bucato].forEach((prodotto, prodottoIndex) => {
            prodotto.formati.forEach((formato, formatoIndex) => {
                const quantita = parseInt(document.getElementById(`quantita-${prodottoIndex}-${formatoIndex}`).value);
                if (quantita > 0) {
                    totaleGlobale += formato.prezzo * quantita;
                }
            });
        });

        document.getElementById('totaleGlobale').textContent = `Totale Globale: €${totaleGlobale}`;
    });
});


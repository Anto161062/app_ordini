document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById('app');
    const customerForm = document.getElementById('customerForm');

    // Gestione del form per i dati del cliente
    customerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita il ricaricamento della pagina

        const nome = document.getElementById('nome').value;
        const cognome = document.getElementById('cognome').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;

        // Mostra i dati del cliente
        app.insertAdjacentHTML('beforebegin', `
            <div id="datiCliente">
                <h3>Dati Cliente</h3>
                <p>Nome: ${nome}</p>
                <p>Cognome: ${cognome}</p>
                <p>Telefono: ${telefono}</p>
                <p>Email: ${email}</p>
            </div>
        `);

        // Nascondi il form dopo aver inviato i dati
        customerForm.style.display = 'none';
    });

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

    // Creazione della lista di essenze
    const essenzeDiv = document.createElement('div');
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
                <p>${formato.ml} -                <p>${formato.ml} - €${formato.prezzo}</p>
                <input type="number" id="quantita-${essenzaIndex}-${formatoIndex}" min="0" placeholder="Quantità">
            `;
            rightDiv.appendChild(formatoDiv);
        });

        essenzaDiv.appendChild(leftDiv);
        essenzaDiv.appendChild(rightDiv);
        essenzeDiv.appendChild(essenzaDiv);
    });

    app.appendChild(essenzeDiv);

    // Bottone per calcolare il totale
    const buttonDiv = document.createElement('div');
    buttonDiv.innerHTML = `
        <button id="calcolaTotale" class="btn">Calcola Totale</button>
        <h3 id="totaleGlobale">Totale Globale: €0</h3>
    `;
    app.appendChild(buttonDiv);

    // Funzione per calcolare il totale
    document.getElementById('calcolaTotale').addEventListener('click', function() {
        let totaleGlobale = 0;

        essenze.forEach((essenza, essenzaIndex) => {
            essenza.formati.forEach((formato, formatoIndex) => {
                const quantita = parseInt(document.getElementById(`quantita-${essenzaIndex}-${formatoIndex}`).value);
                if (quantita > 0) {
                    totaleGlobale += formato.prezzo * quantita;
                }
            });
        });

        document.getElementById('totaleGlobale').textContent = `Totale Globale: €${totaleGlobale}`;
    });
});



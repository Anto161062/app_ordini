document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById('app');

    // Lista dei profumi per ambiente e profuma bucato
    const essenze = [
        { 
            nome: "Vigna Rossa", 
            formati: [ {ml: "200ml", prezzo: 20}, {ml: "500ml", prezzo: 35}, {ml: "1000ml", prezzo: 60} ], 
            immagine: 'immagini/vigna_rossa.png',
            slogan: "Con 'Vigna Rossa', ogni pasto diventa un’esperienza sensoriale che esalta la convivialità e il piacere di stare insieme."
        },
        { 
            nome: "Citri Fructus", 
            formati: [ {ml: "200ml", prezzo: 20}, {ml: "500ml", prezzo: 35}, {ml: "1000ml", prezzo: 60} ], 
            immagine: 'immagini/citri_fructus.png',
            slogan: "Con 'Citri Fructus', ogni giornata inizia con una sferzata di energia e vitalità, un invito a vivere con entusiasmo e freschezza."
        },
        { 
            nome: "Lavanda Menta", 
            formati: [ {ml: "200ml", prezzo: 20}, {ml: "500ml", prezzo: 35}, {ml: "1000ml", prezzo: 60} ], 
            immagine: 'immagini/lavanda_menta.png',
            slogan: "Con Lavanda e Menta, ogni respiro è un invito a rilassarsi e trovare equilibrio nella serenità."
        },
        { 
            nome: "Oltremare", 
            formati: [ {ml: "200ml", prezzo: 20}, {ml: "500ml", prezzo: 35}, {ml: "1000ml", prezzo: 60} ], 
            immagine: 'immagini/oltremare.png',
            slogan: "Con 'Oltremare', ogni respiro è un viaggio verso la tranquillità, un invito a trovare serenità e concentrazione."
        },
        { 
            nome: "Risveglio", 
            formati: [ {ml: "200ml", prezzo: 20}, {ml: "500ml", prezzo: 35}, {ml: "1000ml", prezzo: 60} ], 
            immagine: 'immagini/risveglio.png',
            slogan: "Con 'Risveglio', ogni mattina è un invito a vivere ogni istante con serenità e stile."
        },
        { 
            nome: "Sapientia", 
            formati: [ {ml: "200ml", prezzo: 20}, {ml: "500ml", prezzo: 35}, {ml: "1000ml", prezzo: 60} ], 
            immagine: 'immagini/sapientia.png',
            slogan: "Con 'Sapientia', ogni momento è un invito a esplorare la saggezza interiore, avvolti in un'aura di calma e riflessione."
        },
        { 
            nome: "VaniLime", 
            formati: [ {ml: "200ml", prezzo: 20}, {ml: "500ml", prezzo: 35}, {ml: "1000ml", prezzo: 60} ], 
            immagine: 'immagini/vanilime.png',
            slogan: "Con 'VaniLime', ogni momento diventa una celebrazione di leggerezza e dolcezza."
        },
        // Profuma Bucato
        { 
            nome: "Fiori", 
            formati: [ {ml: "250ml", prezzo: 12}, {ml: "500ml", prezzo: 18} ], 
            immagine: 'immagini/fiori.png',
            slogan: "Con 'Fiori', ogni bucato si trasforma in un giardino profumato, avvolto in note delicate e floreali."
        },
        { 
            nome: "Respiro", 
            formati: [ {ml: "250ml", prezzo: 12}, {ml: "500ml", prezzo: 18} ], 
            immagine: 'immagini/respiro.png',
            slogan: "Con 'Respiro', ogni lavaggio è un soffio di freschezza, puro e rigenerante."
        },
        { 
            nome: "Tramonto", 
            formati: [ {ml: "250ml", prezzo: 12}, {ml: "500ml", prezzo: 18} ], 
            immagine: 'immagini/tramonto.png',
            slogan: "Con 'Tramonto', ogni bucato è come un abbraccio al calar del sole, con note avvolgenti."
        }
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

        // Colonna destra: formati, prezzi e slogan
        const rightDiv = document.createElement('div');
        rightDiv.classList.add('right-column');

        // Slogan
        const sloganDiv = document.createElement('p');
        sloganDiv.classList.add('slogan');
        sloganDiv.innerText = essenza.slogan;
        rightDiv.appendChild(sloganDiv);

        // Formati e prezzi
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


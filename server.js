const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Salva i dati del cliente
app.post('/salvaCliente', (req, res) => {
    const cliente = req.body;

    // Legge e aggiorna clienti.json
    fs.readFile('clienti.json', (err, data) => {
        if (err) {
            return res.status(500).send('Errore nella lettura del file');
        }
        const clienti = JSON.parse(data);
        clienti.push(cliente);

        fs.writeFile('clienti.json', JSON.stringify(clienti), (err) => {
            if (err) {
                return res.status(500).send('Errore nella scrittura del file');
            }

            // Invia email di conferma
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'tuaemail@gmail.com',
                    pass: 'tuapassword'
                }
            });

            const mailOptions = {
                from: 'tuaemail@gmail.com',
                to: cliente.email,
                subject: 'Conferma Ordine',
                text: `Grazie per il tuo ordine, ${cliente.nome}!`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).send('Errore nell\'invio dell\'email');
                } else {
                    return res.send('Cliente salvato e email inviata');
                }
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});


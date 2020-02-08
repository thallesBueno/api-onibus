const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');

const urlTm1 = 'http://siumobile.teubilhete.com.br:6060/siumobile-ws-v01/rest/ws/retornaVeiculosMapa/99/0/retornoJSONVeiculos?callback=jQuery1102005223571880496336_1581111122735&_=1581111122737';
const urlItinerario = 'http://siumobile.teubilhete.com.br:6060/siumobile-ws-v01/rest/ws/buscarItinerario/99/0/retornoJSONItinerario?callback=jQuery110207893216543935613_1581114621074&_=1581114621076';
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('short'));

const convertResponse = res => JSON.parse(res.slice(20-res.length,-1));
const convertResponse2 = res => JSON.parse(res.slice(22-res.length,-1));

app.get('/', async (req,res) => { 

    const { data } = await axios.get(urlTm1);
    res.send(convertResponse(data));
});

app.get('/itinerario', async (req,res) => { 

    const { data } = await axios.get(urlItinerario);
    res.send(convertResponse2(data));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
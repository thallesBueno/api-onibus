const express = require('express');
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');

const urlBase = 'http://siumobile.teubilhete.com.br:6060/siumobile-ws-v01/rest/ws';
const urlTm1 = urlBase + '/retornaVeiculosMapa/99/0/retornoJSONVeiculos';
const urlItinerario = urlBase + '/buscarItinerario/99/0/retornoJSONItinerario';


const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

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
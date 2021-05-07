const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', (req, res) => {
    try {
        const event = req.body;
        console.log('--EVENT BUS-- event : { type: ' + event.type + ' }, data: { ' + event.data + ' };');
        axios.post('http://localhost:4000/events', event);
        axios.post('http://localhost:4001/events', event);
        axios.post('http://localhost:4002/events', event);
        axios.post('http://localhost:4003/events', event);
    } catch (err) {
        console.log('--EVENT BUS-- error : ' + err);
    }
    res.send({ status : 'OK' });
});

app.listen(4005, () => {
    console.log('Event-bus listening on port 4005');
});
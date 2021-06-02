const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const secrets = {};

app.get('/secrets', (req, res) => {
    res.send(secrets);
});

app.post('/secrets', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { secret } = req.body;

    secrets[id] = { id, secret };

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'SecretCreated',
        data: {
            id, secret
        }
    });

    res.status(201).send(secrets[id]);
});

app.post('/events', (req,res) => {
    console.log('Received Event', req.body.type);
    res.send({});
});

app.listen(4000, () => {
    console.log('Secrets service listening on port 4000')
});

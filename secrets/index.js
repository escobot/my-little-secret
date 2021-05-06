const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());
app.use(cors());

const secrets = {};

app.get('/secrets', (req, res) => {
    res.send(secrets);
});

app.post('/secrets', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { secret } = req.body;
    console.log(id);
    secrets[id] = { id, secret };

    res.status(201).send(secrets[id]);
});

app.listen(4000, () => {
    console.log('Listening on port 4000')
});

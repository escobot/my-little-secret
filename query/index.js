const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const secrets = {};

app.get('/secrets', (req, res) => {
    res.send(secrets);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    console.log(req.body)
    if (type === 'SecretCreated') {
        const { id, secret } = data;
        secrets[id] = {id, secret, comments: []}
    }

    if (type === 'CommentCreated') {
        const { id, content, secretId } = data;
        const secret = secrets[secretId];
        secret.comments.push({id, content});
    }

    res.send({});
});

app.listen(4002, () => {
    console.log('Query service listening on port 4002');
})
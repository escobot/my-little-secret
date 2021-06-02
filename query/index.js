const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(express.json());
app.use(cors());

const secrets = {};

const handleEvents = (type, data) => {
    if (type === 'SecretCreated') {
        const { id, secret } = data;
        secrets[id] = {id, secret, comments: []}
    }

    if (type === 'CommentCreated') {
        const { id, content, secretId, status } = data;
        const secret = secrets[secretId];
        secret.comments.push({id, content, status});
    }

    if (type === 'CommentUpdated') {
        const { id, content, secretId, status } = data;
        const secret = secrets[secretId];
        const comment = secret.comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;
        comment.content = content;
    }
};

app.get('/secrets', (req, res) => {
    res.send(secrets);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    handleEvents(type, data);
    res.send({});
});

app.listen(4002, async () => {
    console.log('Query service listening on port 4002');

    const res = await axios.get('http://event-bus-srv:4005/events');
    for (let event of res.data) {
        handleEvents(event.type, event.data);
    }
})
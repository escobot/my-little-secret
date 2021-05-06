const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());
app.use(cors());

const commentsBySecretId = {};

app.get('/secrets/:id/comments', (req, res) => {
    res.send(commentsBySecretId[req.params.id] || []);
});

app.post('/secrets/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsBySecretId[req.params.id] || [];

    comments.push({ id : commentId, content });

    commentsBySecretId[req.params.id] = comments;
    
    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log('Listening on port 4001')
});
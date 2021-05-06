const express = require('express');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const commentsBySecretId = {};

app.get('/secrets/:id/comments', (req, res) => {
    res.send(commentsBySecretId[req.params.id] || []);
});

app.post('/secrets/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsBySecretId[req.params.id] || [];

    comments.push({ id : commentId, content });

    commentsBySecretId[req.params.id] = comments;
    
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    });

    res.status(201).send(comments);
});


app.post('/events', (req, res) => {
    
});


app.listen(4001, () => {
    console.log('Comments service listening on port 4001')
});
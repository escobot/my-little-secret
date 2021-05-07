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

    comments.push({ id : commentId, content, status: 'pending' });

    commentsBySecretId[req.params.id] = comments;
    
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            secretId: req.params.id,
            status: 'pending'
        }
    });

    res.status(201).send(comments);
});


app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { secretId, id, content, status } = data;
        const comments = commentsBySecretId[secretId];

        const comment = comments.find(comment => {
            return comment.id === id;
        });

        comment.status = status;

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                secretId,
                content,
                status
            }
        });
    }

    res.send({});
});


app.listen(4001, () => {
    console.log('Comments service listening on port 4001')
});
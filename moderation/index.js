const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const profanityFilter = ["stupid"];

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type == 'CommentCreated') {
        const status = profanityFilter.includes(data.content) ? 'rejected' : 'approved';
        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                secretId: data.secretId,
                status,
                content: data.content
            }
        });
    }

    res.send({});
});

app.listen(4003, () => {
    console.log('Moderation service listening on port 4003');
});
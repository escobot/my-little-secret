const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/secrets', (req, res) => {

});

app.post('/events', (req, res) => {

});

app.listen(4002, () => {
    console.log('Query service listening on port 4002');
})
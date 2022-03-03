const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config({path: './.env'});

require('./Database/database')

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Social Directory Application')
})

app.listen(process.env.PORT, () => {
    console.log(`Server is listening to the port`);
})

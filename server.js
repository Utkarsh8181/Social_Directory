import dotenv from 'dotenv';
import express from 'express';
import { logger } from './logger/logger.js'
const app = express();

dotenv.config({ path: './.env' });

import('./database/database.js')

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Social Directory Application')
})

app.listen(process.env.PORT, () => {
    logger.info(`Server is listening to the port`);
})
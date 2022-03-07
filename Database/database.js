import mongoose from 'mongoose';
import { logger } from '../logger/logger.js'

const database = process.env.URL;
mongoose.connect(database)
    .then(() => {
        logger.info('Successfull connected to the database');
    })
    .catch((error) => {
        logger.error("Error while connecting to the database!", error);
        process.exit();
    })
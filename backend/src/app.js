import cors from 'cors';
import express from 'express';
import routes from './routes/index.js';
import db from './config/db_config.js';

function connect_db() {
    db.on('error', (error) => console.log(error));
    db.once('open', () => {
        console.log('Coneção com o database OK!');
    });
};

connect_db();
const app = express(); 
app.use(cors());
app.use(express.json());

routes(app);

export default app;
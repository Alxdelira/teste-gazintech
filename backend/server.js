import * as dotenv from 'dotenv';
import app from './src/app.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerOptions from './src/docs/head.js';


dotenv.config();

const PORT = process.env.PORT || 3334;

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)));

app.listen(PORT, () => {
    console.log(`Servidor rodando no http://localhost:${PORT}`);
});
import * as dotenv from 'dotenv';
import app from './src/app.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerOptions from './src/docs/head.js';


dotenv.config();

const PORT = process.env.PORT || 3334;


const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.7/swagger-ui.min.css";


const swaggerDocs = swaggerJsDoc(swaggerOptions);


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { customCssUrl: CSS_URL }));

app.listen(PORT, () => {
    console.log(`Servidor rodando no http://localhost:${PORT}`);
});
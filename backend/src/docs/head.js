import { devPaths, nivelPaths } from "./paths.js";
import { devSchema, nivelSchema } from "./schemas.js";


const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API - GazinTech",
            description:
                "A api desenvolvida para teste pratico de Fullstack da empresa <_GazinTech>.",
            version: "0.0.1",
            license: {
                name: "GPLv3",
                url: "http://www.gnu.org/licenses/gpl-3.0.html",
            },
        },
        externalDocs: {
            description: "Documentação detalhada",
            url: "",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
                description: "API em desenvolvimento",
            }
        ],
        components: {
            schemas: {
                ...devSchema,
                ...nivelSchema
            },
        },
        tags: [
            {
                name: "Desenvolvedor",
                description: "Endpoints relacionados a desenvolvedores.",
            },
            {
                name: "Nivel",
                description: "Endpoints relacionados a niveis.",
            },
        ],
        paths: {
            ...devPaths,
            ...nivelPaths
        },
    },
    apis: ["./src/routes/*.js"],
};

export default swaggerOptions
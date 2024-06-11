

export const devPaths = {
    "/api/desenvolvedores": {
        get: {
            tags: ["Desenvolvedor"],
            summary: "Listar desenvolvedores",
            parameters: [{
                name: "per_page",
                in: "query",
                required: false,
                description: "Quantidade de registros por página.",
                schema: {
                    type: "integer",
                }
            },
            {
                name: "current_page",
                in: "query",
                required: false,
                description: "Número da página.",
                schema: {
                    type: "integer",
                }
            },
            {
                name: "nome",
                in: "query",
                required: false,
                description: "Nome do desenvolvedor.",
                schema: {
                    type: "string",
                }
            },
            {
                name: "sexo",
                in: "query",
                required: false,
                description: "Sexo do desenvolvedor.",
                schema: {
                    type: "string",
                }
            },
            {
                name: "idade",
                in: "query",
                required: false,
                description: "Idade do desenvolvedor.",
                schema: {
                    type: "integer",
                }
            },
            {
                name: "data_nascimento",
                in: "query",
                required: false,
                description: "Data de nascimento do desenvolvedor.",
                schema: {
                    type: "string",
                }
            },
            {
                name: "nivel",
                in: "query",
                required: false,
                description: "Nível do desenvolvedor.",
                schema: {
                    type: "string",
                }
            },
            {
                name: "hobby",
                in: "query",
                required: false,
                description: "Hobby do desenvolvedor.",
                schema: {
                    type: "string",
                }
            }
        
        ],
            responses: {
                200: {
                    description: "Listagem de desenvolvedores.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Desenvolvedor",
                            },
                        },
                    },
                },
            },
        },
        post: {
            tags: ["Desenvolvedor"],
            summary: "Criar desenvolvedor",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                nome: { type: "string", example: "João da Silva" },
                                idade: { type: "integer", example: 30 },
                                hobby: { type: "string", example: "Jogar futebol" },
                                data_nascimento: { type: "string", example: "1991-01-01" },
                                sexo: { type: "string", example: "M" },
                                nivel_id: { type: "integer", example: 1 },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Desenvolvedor criado.",
                },
            },
        },
    },
    "/api/desenvolvedores/{id}": {
        get: {
            tags: ["Desenvolvedor"],
            summary: "Listar desenvolvedor",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "Identificador do desenvolvedor.",
                    schema: {
                        type: "integer",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Desenvolvedor listado.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Desenvolvedor",
                            },
                        },
                    },
                },
            },
        },
        put: {
            tags: ["Desenvolvedor"],
            summary: "Atualizar desenvolvedor",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "Identificador do desenvolvedor.",
                    schema: {
                        type: "integer",
                    },
                },
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                nome: { type: "string", example: "Marcelo de Assis" },
                                idade: { type: "integer", example: 30 },
                                hobby: { type: "string", example: "Vê Animes" },
                                data_nascimento: { type: "string", example: "1991-04-01" },
                                sexo: { type: "string", example: "M" },
                                nivel_id: { type: "integer", example: 2 },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Desenvolvedor atualizado.",
                },
            },
        },
        delete: {
            tags: ["Desenvolvedor"],
            summary: "Deletar desenvolvedor",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "Identificador do desenvolvedor.",
                    schema: {
                        type: "integer",
                    },
                },
            ],
            responses: {
                204: {
                    description: "Desenvolvedor deletado.",
                },
            },
        },
    },
};

export const nivelPaths = {
    "/api/niveis": {
        get: {
            tags: ["Nivel"],
            summary: "Listar niveis",
            parameters: [{
                name: "per_page",
                in: "query",
                required: false,
                description: "Quantidade de registros por página.",
                schema: {
                    type: "integer",
                }
            },
            {
                name: "current_page",
                in: "query",
                required: false,
                description: "Número da página.",
                schema: {
                    type: "integer",
                }
            },
            {
                name: "nivel",
                in: "query",
                required: false,
                description: "Nome do nivel.",
                schema: {
                    type: "string",
                }
            }],
            responses: {
                200: {
                    description: "Listagem de niveis.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Nivel",
                            },
                        },
                    },
                },
            },
        },
        post: {
            tags: ["Nivel"],
            summary: "Criar nivel",
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                nivel: { type: "string", example: "Pleno" },
                            },
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Nivel criado.",
                },
            },
        },
    },
    "/api/niveis/{id}": {
        get: {
            tags: ["Nivel"],
            summary: "Listar nivel",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "Identificador do nivel.",
                    schema: {
                        type: "integer",
                    },
                },
            ],
            responses: {
                200: {
                    description: "Nivel listado.",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Nivel",
                            },
                        },
                    },
                },
            },
        },
        put: {
            tags: ["Nivel"],
            summary: "Atualizar nivel",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "Identificador do nivel.",
                    schema: {
                        type: "integer",
                    },
                },
            ],
            requestBody: {
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                nivel: { type: "string", example: "Sênior" },
                            },
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Nivel atualizado.",
                },
            },
        },
        delete: {
            tags: ["Nivel"],
            summary: "Deletar nivel",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "Identificador do nivel.",
                    schema: {
                        type: "integer",
                    },
                },
            ],
            responses: {
                204: {
                    description: "Nivel deletado.",
                },
            },
        },
    },
};

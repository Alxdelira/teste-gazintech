

export const devPaths = {
    "/api/desenvolvedores": {
        get: {
            tags: ["Desenvolvedor"],
            summary: "Listar desenvolvedores",
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
                            $ref: "#/components/schemas/Desenvolvedor",
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
                            $ref: "#/components/schemas/Desenvolvedor",
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
                            $ref: "#/components/schemas/Nivel",
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
                            $ref: "#/components/schemas/Nivel",
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
        }
    }
}
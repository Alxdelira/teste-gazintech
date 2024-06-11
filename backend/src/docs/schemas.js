

export const devSchema = {
    Desenvolvedor: {
        type: "object",
        properties: {
            
            nome: {
                type: "string",
                description: "Nome do desenvolvedor.",
            },
            idade: {
                type: "integer",
                description: "Idade do desenvolvedor.",
            },
            hobby: {
                type: "string",
                description: "Hobby do desenvolvedor.",
            },
            data_nascimento: {
                type: "string",
                description: "Data de nascimento do desenvolvedor.",
            },
            sexo: {
                type: "string",
                description: "Sexo do desenvolvedor.",
            },
            nivel_id: {
                type: "integer",
                description: "Identificador do nivel do desenvolvedor.",
            },
            
        },
    },
};

export const nivelSchema = {
    Nivel: {
        type: "object",
        properties: {
            id: {
                type: "integer",
                description: "Identificador do nivel.",
            },
            nivel: {
                type: "string",
                description: "Descrição do nivel.",
            },
        },
    },
};
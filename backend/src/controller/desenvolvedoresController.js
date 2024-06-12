import { prisma } from "../config/prismaClient.js"


export default class DesenvolvvedoresController {
    static async listarDesenvolvedores(req, res) {
        const { page = 1, limit = 10 } = req.query;
        const { nome, sexo, idade, data_nascimento, nivel, hobby } = req.query;

        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);

        if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber < 1 || pageSize < 1) {
            return res.status(400).json({ error: 'Parâmetros de paginação inválidos' });
        }

        const filters = {};
        if (nome) {
            filters.nome = { contains: nome, mode: 'insensitive' }
        }
        if (sexo) {
            filters.sexo = { equals: sexo };
        }
        if (idade) {
            filters.idade = { equals: Number(idade) };
        }
        if (data_nascimento) {
            filters.data_nascimento = { equals: data_nascimento };
        }
        if (hobby) {
            filters.hobby = { contains: hobby, mode: 'insensitive' };
        }
        if (nivel) {
            filters.nivel = { nivel: { contains: nivel , mode: 'insensitive'} };
        }

        try {
            const desenvolvedores = await prisma.desenvolvedor.findMany({
                skip: (pageNumber - 1) * pageSize,
                take: pageSize,
                where: filters,
                include: {
                    nivel: true
                }
            });

            const totalDesenvolvedores = await prisma.desenvolvedor.count({
                where: filters
            });

            const lastPage = Math.ceil(totalDesenvolvedores / pageSize);

            const response = {
                data: desenvolvedores,
                meta: {
                    total: totalDesenvolvedores,
                    per_page: pageSize,
                    current_page: pageNumber,
                    last_page: lastPage
                }
            };

            if (response.data.length === 0) {
                return res.status(404).json({ error: "Nenhum desenvolvedor encontrado" });
            }

            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }


    static async listarDesenvolvedor(req, res) {
        const { id } = req.params;
        try {
            const desenvolvedor = await prisma.desenvolvedor.findUnique({
                where: {
                    id: Number(id)
                }
            });
            if (!desenvolvedor) {
                return res.status(404).json({ error: "Desenvolvedor não encontrado" });
            }
            return res.status(200).json(desenvolvedor);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async criarDesenvolvedor(req, res) {
        try {
            const { nome, sexo, data_nascimento, hobby, nivel_id, idade } = req.body;
            const novoDesenvolvedor = await prisma.desenvolvedor.create({
                data: {
                    nome,
                    sexo,
                    idade,
                    data_nascimento,
                    hobby,
                    nivel_id
                }
            });
            return res.status(201).json(novoDesenvolvedor);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message });
        }
    }

    static async atualizarDesenvolvedor(req, res) {
        try {
            const { id } = req.params;
            const { nome, sexo, idade, data_nascimento, hobby, nivel_id } = req.body;
            const desenvolvedor = await prisma.desenvolvedor.update({
                where: {
                    id: Number(id)
                },
                data: {
                    nome,
                    sexo,
                    idade,
                    data_nascimento,
                    hobby,
                    nivel_id

                }
            });
            return res.status(200).json(desenvolvedor);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async deletarDesenvolvedor(req, res) {
        const { id } = req.params;
        try {
            const desenvolvedor = await prisma.desenvolvedor.findUnique({
                where: {
                    id: Number(id)
                }
            });
            if (!desenvolvedor) {
                return res.status(400).json({ error: "Desenvolvedor não encontrado" });
            }

            await prisma.desenvolvedor.delete({
                where: {
                    id: Number(id)
                }
            });
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }


}
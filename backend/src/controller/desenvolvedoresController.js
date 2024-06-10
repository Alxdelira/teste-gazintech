import { prisma } from "../config/prismaClient.js"


export default class DesenvolvvedoresController {
    static async listarDesenvolvedores(req, res) {
        try {
            const desenvolvedores = await prisma.desenvolvedor.findMany({
                include: {
                    nivel: true
                }
            });
            return res.status(200).json(desenvolvedores);
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
        const { nome, sexo, data_nascimento, hobby, nivel_id, idade } = req.body;
        try {
            const novoDesenvolvedor = await prisma.desenvolvedor.create({
                data: {
                    nome,
                    sexo,
                    idade,
                    data_nascimento,
                    hobby,
                    nivel: {
                        connect: {
                            id: nivel_id
                        }
                    }
                }
            });
            return res.status(201).json(novoDesenvolvedor);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async atualizarDesenvolvedor(req, res) {
        const { id } = req.params;
        const { nome, idade, hobby } = req.body;
        try {
            const desenvolvedor = await prisma.desenvolvedor.update({
                where: {
                    id: Number(id)
                },
                data: {
                    nome,
                    idade,
                    hobby
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
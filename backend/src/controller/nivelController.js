import { prisma } from "../config/prismaClient.js"

export default class NivelController {
    static async listarNiveis(req, res) {
        const { page = 1, limit = 10 } = req.query;
        const { nivel } = req.query;

        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);

        if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber < 1 || pageSize < 1) {
            return res.status(400).json({ error: 'Parâmetros de paginação inválidos' });
        }
        const filters = {}; 
        if (nivel) {
            filters.nivel = { contains: nivel };
        }
        try {
            const niveis = await prisma.nivel.findMany({
                skip: (pageNumber - 1) * pageSize,
                take: pageSize,
                where: filters,
                include: {
                    desenvolvedores: true
                }
            });

            const totalNiveis = await prisma.nivel.count({
                where: filters
            });

            const lastPage = Math.ceil(totalNiveis / pageSize);

            const response = {
                data: niveis,
                meta: {
                    total: totalNiveis,
                    per_page: pageSize,
                    current_page: pageNumber,
                    last_page: lastPage
                }
            };

            if (response.data.length === 0) {
                return res.status(404).json({ error: "Nenhum nível encontrado" });
            }

            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async listarNivel(req, res) {
        const { id } = req.params;
        try {
            const nivel = await prisma.nivel.findUnique({
                where: {
                    id: Number(id)
                }
            });
            if (!nivel) {
                return res.status(404).json({ error: "Nivel não encontrado" });
            }
            return res.status(200).json(nivel);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async criarNivel(req, res) {
        const { nivel } = req.body;
        try {
            const novoNivel = await prisma.nivel.create({
                data: {
                    nivel
                }
            });
            return res.status(201).json(novoNivel);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async atualizarNivel(req, res) {
        const { id } = req.params;
        const { nivel } = req.body;
            try {
            const novoNivel = await prisma.nivel.update({
                where: {
                    id: Number(id)
                },
                data: {
                    nivel
                }
            });
            return res.status(200).json(novoNivel);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error.message });
        }
    }

    static async deletarNivel(req, res) {
        const { id } = req.params;
        try {
            const desenvolvedoresAssociados = await prisma.desenvolvedor.findMany({
                where: {
                    nivel_id: Number(id)
                }
            });

            if (desenvolvedoresAssociados.length > 0) {
                return res.status(400).json({ error: "Não é possível deletar o nível. Existem desenvolvedores associados a esse nível." });
            }
            await prisma.nivel.delete({
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
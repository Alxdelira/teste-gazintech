import { prisma } from "../config/prismaClient.js"

export default class NivelController {
    static async listarNiveis(req, res) {
        try {
            const niveis = await prisma.nivel.findMany();
            return res.status(200).json(niveis);
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
            const nivel = await prisma.nivel.update({
                where: {
                    id: Number(id)
                },
                data: {
                    nivel
                }
            });
            return res.status(200).json(nivel);
        } catch (error) {
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
            return res.status(204).json("Nível deletado com sucesso" );
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
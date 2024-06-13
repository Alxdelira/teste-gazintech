import NivelModel from "../model/nivelModel.js";
import { buildQuery, getPaginationOptions } from "../services/queryOptions.js";


export default class NivelController {
    static async listarNiveis(req, res) {
        try {
            const { nivel, desenvolvedor_id, page, perPage } = req.query;
            const query = buildQuery({ nivel, desenvolvedor_id });
            const options = getPaginationOptions(page, perPage);

            const niveis = await NivelModel.paginate(query, options);

            return res.status(200).json({
                data: niveis.docs,
                meta: {
                    total: niveis.totalDocs,
                    per_page: niveis.limit,
                    current_page: niveis.page,
                    last_page: niveis.totalPages,
                }
            });

        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: 'Erro interno no servidor!' });
        }
    }
    static async listarNivelId(req, res) {
        try {
            const { id } = req.params;
            const nivel = await NivelModel.findById(id);

            if (!nivel) {
                return res.status(404).json({ error: true, code: 404, message: 'Nivel não encontrado' });
            }

            return res.status(200).json(nivel);

        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: 'Erro interno no servidor!' });
        }
    }
    static async criarNivel(req, res) {
        try {
            const {
                nivel,
                desenvolvedor_id
            } = req.body;

            const novoNivel = new NivelModel({
                nivel,
                desenvolvedor_id
            });

            await novoNivel.save();
            return res.status(201).json(novoNivel);

        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: 'Erro interno no servidor!' });
        }
    }
    static async atualizarNivel(req, res) {
        try {
            const { id } = req.params;
            const { nivel, desenvolvedor_id } = req.body;

            const nivelAtualizado = await NivelModel.findByIdAndUpdate(id, {
                nivel,
                desenvolvedor_id
            }, { new: true });

            if (!nivelAtualizado) {
                return res.status(404).json({ error: true, code: 404, message: 'Não foi possível atualizar o nivel' });
            }

            return res.status(200).json(nivelAtualizado);
        }
        catch (error) {
            return res.status(500).json({ error: true, code: 500, message: 'Erro interno no servidor!' });
        }
    }
    static async deletarNivel(req, res) {
        try {
            const { id } = req.params;
            const nivel = await NivelModel.findById(id);

            if (!nivel) {
                return res.status(404).json({ error: true, code: 404, message: 'Nivel não encontrado' });
            }
            if (desenvolvedor_id) {
                return res.status(400).json({ error: true, code: 404, message: 'Nivel não pode ser deletado, pois está associado a um desenvolvedor' });
            }

            await NivelModel.findByIdAndDelete(id);
            return res.status(204).send();

        }
        catch (error) {
            return res.status(500).json({ error: true, code: 500, message: 'Erro interno no servidor!' });
        }
    }


}
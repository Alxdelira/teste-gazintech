import DesenvolvedorModel from "../model/desenvolvedorModel.js";
import NivelModel from "../model/nivelModel.js";
import { buildQuery, getPaginationOptions } from "../services/queryOptions.js";


export default class NivelController {
    static async listarNiveis(req, res) {
        try {
            const { nivel, page, perPage } = req.query;
            const query = buildQuery({ nivel });
            const options = getPaginationOptions(page, perPage);
    
            const niveis = await NivelModel.paginate(query, options);
            const { docs } = niveis;
            const nivelIds = docs.map(nivel => nivel._id);
    
      
            const DesenvolvedoresPorNivel = await DesenvolvedorModel.aggregate([
                { $match: { nivel_id: { $in: nivelIds } } },
                { $group: { _id: "$nivel_id", total: { $sum: 1 } } } 
            ]);
    
         
            const niveisComTotalDevs = docs.map(nivel => {
                const totalDevs = DesenvolvedoresPorNivel.find(item => item._id.toString() === nivel._id.toString());
                return {
                    ...nivel.toObject(),
                    total_developers: totalDevs ? totalDevs.total : 0 
                };
            });
    
            return res.status(200).json({
                data: niveisComTotalDevs, 
                meta: {
                    total: niveis.totalDocs,
                    per_page: niveis.limit,
                    current_page: niveis.page,
                    last_page: niveis.totalPages,
                }
            });
        } catch (error) {
            console.log(error);
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
    }static async criarNivel(req, res) {
        try {
            const { nivel } = req.body;
    
            if (!nivel) {
                return res.status(400).json({ error: true, code: 400, message: 'O campo "nivel" é obrigatório' });
            }
    
            const novoNivel = new NivelModel({ nivel });
    
            // Verificação adicional para garantir que o objeto não está vazio
            if (Object.keys(novoNivel).length === 0) {
                return res.status(400).json({ error: true, code: 400, message: 'Nivel não pode ser vazio' });
            }
    
            await novoNivel.save();
            return res.status(201).json({ data: novoNivel, meta: {}, error: false, message: 'Nível criado com sucesso' });
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ error: true, code: 400, message: 'Dados inválidos fornecidos' });
            }
    
            console.error(error); // Log do erro para depuração
            return res.status(500).json({ error: true, code: 500, message: 'Erro interno no servidor!' });
        }
    }
    
    
    static async atualizarNivel(req, res) {
        try {
            const { id } = req.params;
            const { nivel } = req.body;

            const nivelAtualizado = await NivelModel.findByIdAndUpdate(id, {
                nivel
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
           

            const niveis = await NivelModel.paginate();
            const { docs } = niveis;
            const nivelIds = docs.map(nivel => nivel._id);
            const DesenvolvedoresPorNivel = await DesenvolvedorModel.aggregate([
                { $match: { nivel_id: { $in: nivelIds } } },
                { $group: { _id: "$nivel_id" } }
            ]);

            const qtdDev = DesenvolvedoresPorNivel[0]._id.toString();

            if (!nivel) {
                return res.status(404).json({ error: true, code: 404, message: 'Nivel não encontrado' });
            }
            if (qtdDev === req.params.id) {
                return res.status(400).json({ error: true, code: 400, message: 'Nivel não pode ser deletado, pois está associado a um desenvolvedor' });
            }

            await NivelModel.findByIdAndDelete(id);
            return res.status(204).send();

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error: true, code: 500, message: 'Erro interno no servidor!' });
        }
    }


}
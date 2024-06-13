import DesenvolvedorModel from "../model/desenvolvedorModel.js";
import { buildQuery, getPaginationOptions } from "../services/queryOptions.js";



export default class DesenvolvvedoresController {
    static async listarDesenvolvedores(req, res) {
        try {
            const { nome, sexo, data_nascimento, hobby, page, perPage, nivel_id } = req.query;
            const query = buildQuery({ nome, sexo, data_nascimento, hobby, nivel_id});
            const options = getPaginationOptions(page, perPage);

            const desenvolvedores = await DesenvolvedorModel.paginate(query, options);

            const { docs } = desenvolvedores;

            await DesenvolvedorModel.populate(docs, { path: 'nivel_id' });
            
            return res.status(200).json({
                data: desenvolvedores.docs,
                meta: {
                    total: desenvolvedores.totalDocs, 
                    per_page: desenvolvedores.limit, 
                    current_page: desenvolvedores.page,
                    last_page: desenvolvedores.totalPages,
                }
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error:true, code:500, message: 'Erro interno no servidor!' });
        }
    }
    static async listarDesenvolvedorId(req, res) {
        try {
            const { id } = req.params;
            const desenvolvedor = await DesenvolvedorModel.findById(id).populate('nivel_id');

            if (!desenvolvedor) {
                return res.status(404).json({ error: true, code: 404, message: 'Desenvolvedor não encontrado' });
            }

            return res.status(200).json(desenvolvedor);

        } catch (error) {
            return res.status(500).json({ error:true, code:500, message: 'Erro interno no servidor!' });
        }
    }
    static async criarDesenvolvedor(req, res) {
        try {
            const {
                nome,
                sexo,
                data_nascimento,
                hobby,
                nivel_id
            }= req.body;

            const novoDesenvolvedor = new DesenvolvedorModel({
                nome,
                sexo,
                data_nascimento,
                hobby,
                nivel_id
            });

            if (!nome || !sexo || !data_nascimento || !hobby || !nivel_id) {
                return res.status(400).json({ error: true, code: 400, message: 'Dados inválidos' });
            }

            const desenvolvedor = await novoDesenvolvedor.save();

            return res.status(201).json(desenvolvedor);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error:true, code:500, message: 'Erro interno no servidor!' });
        }
    
    }
    static async atualizarDesenvolvedor(req, res) {
        try {
            const { id } = req.params;
            const {
                nome,
                sexo,
                data_nascimento,
                hobby,
                nivel_id
            } = req.body;

            const desenvolvedor = await DesenvolvedorModel.findById(id);

            if (!desenvolvedor) {
                return res.status(404).json({ error: true, code: 404, message: 'Desenvolvedor não encontrado' });
            }

            desenvolvedor.nome = nome;
            desenvolvedor.sexo = sexo;
            desenvolvedor.data_nascimento = data_nascimento;
            desenvolvedor.hobby = hobby;
            desenvolvedor.nivel_id = nivel_id;

            const desenvolvedorAtualizado = await desenvolvedor.save();

            return res.status(200).json(desenvolvedorAtualizado);

        } catch (error) {
            return res.status(500).json({ error:true, code:500, message: 'Erro interno no servidor!' });
        }
    }

    static async deletarDesenvolvedor(req, res) {
        try {
            const { id } = req.params;

            const desenvolvedor = await DesenvolvedorModel.findById(id);

            if (!desenvolvedor) {
                return res.status(404).json({ error: true, code: 404, message: 'Desenvolvedor não encontrado' });
            }
            await DesenvolvedorModel.findByIdAndDelete(id);

            return res.status(204).send();

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error:true, code:500, message: 'Erro interno no servidor!' });
        }
    }
}
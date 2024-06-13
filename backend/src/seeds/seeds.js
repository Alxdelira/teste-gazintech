import nivelSeed from "./nivelSeed.js";
import desenvolvedorSeed from "./desenvolvedorSeed.js";
import db from "../config/db_config.js";
import NivelModel from "../model/nivelModel.js";
import DesenvolvedorModel from "../model/desenvolvedorModel.js";

// Event listeners para o banco de dados
db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
    console.log('Conexão com o banco estabelecida!');
});

async function seed() {
    try {
        // Aguardar a conexão ser estabelecida
        await db;

        // Limpar coleções
        await NivelModel.deleteMany();
        console.log('Coleção NivelModel limpa.');
        await DesenvolvedorModel.deleteMany();
        console.log('Coleção DesenvolvedorModel limpa.');

        // Executar seeds
        await nivelSeed();
        console.log('Nivel seed executado com sucesso.');
        await desenvolvedorSeed(10);
        console.log('Desenvolvedor seed executado com sucesso.');

        console.log('Seed executado com sucesso!');
    } catch (error) {
        console.error('Erro durante o processo de seed:', error);
    } finally {
        // Fechar a conexão com o banco de dados
        await db.close();
        console.log('Conexão com o banco fechada.');
    }
}

// Executar a função de seed
seed();




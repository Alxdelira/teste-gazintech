import nivelSeed from "./nivelSeed.js";
import { prisma } from '../config/prismaClient.js'
import desenvolvedorSeed from "./desenvolvedorSeed.js";

async function seed() {
    await prisma.nivel.deleteMany()
    console.log('Deletando dados da tabela Nivel')
    await nivelSeed()
    await prisma.desenvolvedor.deleteMany()
    console.log('Deletando dados da tabela Desenvolvedor')
    await desenvolvedorSeed(50)
    console.log("Desenvolvedor Inserido")
    await prisma.$disconnect()
    console.log('Conexão encerrada')
}


seed()
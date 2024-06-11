import { prisma } from '../config/prismaClient.js'


const niveis = [
    {
        nivel: 'Junior'
    },
    {
        nivel: 'Pleno'
    },
    {
        nivel: 'Senior'
    },
    {
        nivel: 'Estagiário'
    },
    {
        nivel: 'Trainee'
    }
]

export default async function nivelSeed() {
    for (const nivel of niveis) {
        await prisma.nivel.create({
            data: nivel
        });
    }
}

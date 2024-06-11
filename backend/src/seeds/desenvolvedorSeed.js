import { prisma } from "../config/prismaClient.js";
import { faker } from "@faker-js/faker";

async function getRandomNivelId() {
    const niveis = await prisma.nivel.findMany();

    if (niveis.length > 0) {
        const randomIndex = Math.floor(Math.random() * niveis.length);
        return niveis[randomIndex].id;
    } else {
        throw new Error("Nenhum nível encontrado");
    }
}

export default async function desenvolvedorSeed(quantidade) {
    const nivelId = await getRandomNivelId();

    const desenvolvedores = Array.from({ length: quantidade }, () => ({
        nome: faker.person.fullName(),
        idade: faker.number.int({ min: 10, max: 60 }),
        sexo: faker.helpers.arrayElement(["M", "F"]), 
        hobby: faker.lorem.word(),
        data_nascimento: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }).toISOString().split('T')[0], 
        nivel_id: nivelId
    }));

    for (const desenvolvedor of desenvolvedores) {
        await prisma.desenvolvedor.create({
            data: desenvolvedor
        });
    }
}


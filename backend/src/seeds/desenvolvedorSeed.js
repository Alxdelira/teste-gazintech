import { faker } from "@faker-js/faker";
import NivelModel from "../model/nivelModel.js";
import DesenvolvedorModel from "../model/desenvolvedorModel.js";

async function getRandomNivelId() {
    const niveis = await NivelModel.find();
    const nivel = faker.helpers.arrayElement(niveis);
    return nivel._id;

}

export default async function desenvolvedorSeed(quantidade) {
    const nivel_id = await getRandomNivelId();

    const desenvolvedores = Array.from({ length: quantidade }, () => ({
        nome: faker.person.fullName(),
        sexo: faker.helpers.arrayElement(["M", "F"]),
        hobby: faker.lorem.word(),
        data_nascimento: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }).toISOString().split('T')[0],
        nivel_id: nivel_id
    }));

    for (const desenvolvedor of desenvolvedores) {
        await DesenvolvedorModel.create(desenvolvedor);
    }
}


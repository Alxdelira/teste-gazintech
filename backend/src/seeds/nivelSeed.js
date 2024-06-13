import NivelModel from "../model/nivelModel.js";



const niveis = [
    'Junior',
    'Pleno',
    'Senior',
    'Especialista',
    'Master',
    'Estagiário',
    'Trainee'
]

export default async function nivelSeed() {
    for (const nivel of niveis) {
        await NivelModel.create({ nivel });
    }

}

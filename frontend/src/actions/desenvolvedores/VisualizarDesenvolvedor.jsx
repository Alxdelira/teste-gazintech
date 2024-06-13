

export default function VisualizarDesenvolvedor({ desenvolvedor }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="shadow-md p-4 rounded-lg bg-white">
                <label className="font-semibold block mb-1">Nome</label>
                <p className="text-gray-800">{desenvolvedor?.nome || "Não informado"}</p>
            </div>
            <div className="shadow-md p-4 rounded-lg bg-white">
                <label className="font-semibold block mb-1">Data de Nascimento</label>
                <p className="text-gray-800">{desenvolvedor?.data_nascimento || "Não informado"}</p>
            </div>
            <div className="shadow-md p-4 rounded-lg bg-white">
                <label className="font-semibold block mb-1">Sexo</label>
                <p className="text-gray-800">{desenvolvedor?.sexo || "Não informado"}</p>
            </div>
            <div className="shadow-md p-4 rounded-lg bg-white">
                <label className="font-semibold block mb-1">Hobby</label>
                <p className="text-gray-800">{desenvolvedor?.hobby || "Não informado"}</p>
            </div>
            <div className="shadow-md p-4 rounded-lg bg-white">
                <label className="font-semibold block mb-1">Nível</label>
                <p className="text-gray-800">{desenvolvedor?.nivel_id || "Nenhum Nível"}</p>
            </div>
        </div>

    );
}


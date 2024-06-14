

export default function VisualizarNivel({nivel}) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="shadow-md p-4 rounded-lg bg-white">
                    <label className="font-semibold block mb-1">Nome</label>
                    <p className="text-gray-800">{nivel.nivel}</p>
                </div>
                <div className="shadow-md p-4 rounded-lg bg-white">
                    <label className="font-semibold block mb-1">Quantidade de Desenvolvedores</label>
                    <p className="text-gray-800">{nivel?.total_developers || "Não há Desenvolvedores"}</p>
                </div>
            </div>
        </>
    );
}


export default function VisualizarDesenvolvedor({ desenvolvedor }) {
    return (
        <>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="font-semibold">Nome</label>
                    <p>{desenvolvedor?.nome}</p>
                </div>
                <div>
                    <label className="font-semibold">Data de Nascimento</label>
                    <p>{desenvolvedor?.data_nascimento}</p>
                </div>
                <div>
                    <label className="font-semibold">Hobby</label>
                    <p>{desenvolvedor?.hobby}</p>
                </div>
                <div>
                    <label className="font-semibold">Sexo</label>
                    <p>{desenvolvedor?.sexo}</p>
                </div>
                <div>
                    <label className="font-semibold">Idade</label>
                    <p>{desenvolvedor?.idade}</p>
                </div>
                <div>
                    <label className="font-semibold">Nível</label>
                    <p>{desenvolvedor?.nivel?.nivel || "Nenhum Nível"}</p>
                </div>
            </div>
        </>
    )
}

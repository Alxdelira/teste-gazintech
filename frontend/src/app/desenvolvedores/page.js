import DataTableDevs from "@/actions/desenvolvedores/DataTableDevs";
import FormBuscaDevs from "@/actions/desenvolvedores/FormBuscaDevs";
import { Button } from "@/components/ui/button";
import { fetchDesenvolvedores } from "@/utils/fetchClient";
import { Plus } from "lucide-react";



export default async function Desenvolvedores({ searchParams }) {
    const { data: data, meta } = await fetchDesenvolvedores(searchParams);

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Desenvolvedores</h1>
                <Button><Plus />Novo Desenvolvedor</Button>
            </div>

            <FormBuscaDevs querys={searchParams} />

            <DataTableDevs data={data} meta={meta} />
        </>
    );
}

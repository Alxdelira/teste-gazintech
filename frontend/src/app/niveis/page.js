
import FormBuscaDevs from "@/actions/desenvolvedores/FormBuscaDevs";
import { Button } from "@/components/ui/button";
import { fetchApi } from "@/utils/fetchClient";
import { Plus } from "lucide-react";
import Link from "next/link";
import DataTableNiveis from "@/actions/niveis/DatatableNiveis";



export default async function Niveis({ searchParams, serchParamsDevs }) {
    // const { data: data, meta } = await fetchApi('/niveis','GET', searchParams);
    const { data, meta } = await fetchApi('/niveis', 'GET', searchParams);

    console.log(meta);


    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">niveis</h1>
                <Button className="flex items-center gap-2"
                ><Plus />
                    <Link href="/niveis/cadastrar">
                        Novo Nível
                    </Link>
                </Button>
            </div>

            <FormBuscaDevs querys={searchParams} />

            <DataTableNiveis
                data={data}
                meta={meta}
                serchParams={searchParams}                
            />
        </>
    );
}
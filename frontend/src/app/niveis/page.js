

import { Button } from "@/components/ui/button";
import { fetchApi } from "@/utils/fetchClient";
import { Plus } from "lucide-react";
import Link from "next/link";
import DataTableNiveis from "@/actions/niveis/DatatableNiveis";
import FormBuscaNiveis from "@/actions/niveis/FormBuscarNiveis";



export default async function Niveis({ searchParams }) {
    const { data, meta } = await fetchApi('/niveis', 'GET', searchParams, {
        next: {
            tags: ['niveis']
        }
    });

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Níveis</h1>
                <Button className="flex items-center gap-2"
                ><Plus />
                    <Link href="/niveis/cadastrar">
                        Novo Nível
                    </Link>
                </Button>
            </div>

            <FormBuscaNiveis querys={searchParams} />

            <DataTableNiveis
                data={data}
                meta={meta}
                serchParams={searchParams}
            />
        </>
    );
}
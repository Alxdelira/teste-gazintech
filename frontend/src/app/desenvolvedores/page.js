import DataTableDevs from "@/actions/desenvolvedores/DataTableDevs";
import FormBuscaDevs from "@/actions/desenvolvedores/FormBuscaDevs";
import { Button } from "@/components/ui/button";
import { getData } from "@/utils/fetchClient";
import { Plus } from "lucide-react";
import Link from "next/link";



export default async function Desenvolvedores({ searchParams }) {
    const { data: data, meta } = await getData('desenvolvedores', searchParams);

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Desenvolvedores</h1>
                <Button className="flex items-center gap-2"
                ><Plus />
                    <Link href="/desenvolvedores/cadastrar">
                        Novo Desenvolvedor
                    </Link>
                </Button>
            </div>

            <FormBuscaDevs querys={searchParams} />

            <DataTableDevs data={data} meta={meta} />
        </>
    );
}

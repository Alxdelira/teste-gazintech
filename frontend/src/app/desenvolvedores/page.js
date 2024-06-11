import DataTableDevs from "@/actions/desenvolvedores/DataTableDevs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Desenvolvedores() {
    
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Desenvolvedores</h1>
                <Button><Plus />Novo Desenvolvedor</Button>
            </div>

            {/* <FormBuscarAbastecimentos querys={searchParams} /> */}

            <DataTableDevs  />

        </>
    )
}
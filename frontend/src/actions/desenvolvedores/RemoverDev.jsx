'use client'
import ReactToastContainer from "@/components/app/ReactToastContainer";
import { Button } from "@/components/ui/button";
import { fetchApi } from "@/utils/fetchClient";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function RemoverDev({ desenvolvedor, onClick, onRemove }) {

    const router = useRouter();

    async function removeDev() {
        try {
            const res = await fetchApi(`/desenvolvedores/${desenvolvedor?._id}`, 'DELETE');
            if (res.error) {
                toast.error(res.error.message);
            } else {
                toast.success("Desenvolvedor removido com sucesso");
                router.push("/desenvolvedores");
            }
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro inesperado, contate o Administrador");
        }

    }


    return (
        <>            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="shadow-md p-4 rounded-lg bg-white">
                    <label className="font-semibold block mb-1">Deseja realmente remover o :</label>
                    <p className="text-gray-800">{desenvolvedor?.nome || "Não informado"}</p>
                </div>
                <Button
                    onClick={
                        () => {
                            removeDev();
                            onRemove();
                        }
                    }
                    variant='destructive'>Sim</Button>
                <Button
                    onClick={onClick}
                    variant='secondary'>Não</Button>
            </div>

        </>
    );
}
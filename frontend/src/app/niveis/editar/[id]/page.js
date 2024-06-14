'use client'
import ReactToastContainer from "@/components/app/ReactToastContainer";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetchApi } from "@/utils/fetchClient";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState,  useEffect } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import actionRevalidateTag from "@/actions/actionRevalidateTag";

export default function CadastrarDesenvolvedor({ params }) {
    const[nivel, setNivel] = useState(null);
    let router = useRouter();

    const schema = z.object({
        nivel: z.string({ required_error: "O nivel é obrigatorio" }).trim().min(1, { message: "O nivel é obrigatorio" }),
    });

    const form = useForm({
        resolver: zodResolver(schema),
        values: {
            nivel: nivel?.nivel,
        }

    });

    async function getNivel() {
        try {
            const res = await fetchApi(`/niveis/${params?.id}`, 'GET');
            console.log(res);
            if (res.error) {
                toast.error(res.message);
            } else {
                setNivel(res);
            }
        } catch (error) {
            toast.error("Ocorreu um erro inesperado, contate o Administrador");
        }
    }

    useEffect(() => {
        if(params?.id){
            getNivel();           
        }
    }, [params]);

    async function editarNivel(data) {
        try {
            const res = await fetchApi(`/niveis/${params?.id}`, 'PUT', {
                nivel: data?.nivel
            });

            if (res.error) {
                toast.error(res.error.message);
            } else {
                actionRevalidateTag("niveis");
                router.push("/niveis");
                toast.success("Nível Atualizado com sucesso");
            }
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro inesperado, contate o Administrador");
        }
    }


    return (
        <>
            <h1 className="font-semibold text-2xl">Cadastrar Nível</h1>
            <ReactToastContainer />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(editarNivel)} className="mt-4">
                    <div className="grid grid-cols-3 gap-2">
                        <FormField
                            control={form.control}
                            name="nivel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="nivel">Nível</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="nivel"
                                            placeholder="nível"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="w-full flex gap-2 justify-end">
                        <Link href={"/niveis"} className="lg">
                            <Button variant="destructive" size="lg">Cancelar</Button>
                        </Link>
                        <Button size="lg" >Atualizar</Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
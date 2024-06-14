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
import { z } from "zod";

export default function CadastrarDesenvolvedor() {
    const schema = z.object({
        nivel: z.string({ required_error: "O nivel é obrigatorio" }).trim().min(1, { message: "O nivel é obrigatorio" }),
    });

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            nivel: ""
        }

    });

    async function cadastrarNivel(data) {
        try {
            const res = await fetchApi('/niveis', 'POST', {
                nivel: data?.nivel
            });
            console.log(res);

            if (res.error) {
                toast.error(res.message);
            } else {
                toast.success("Nível cadastrado com sucesso");
                form.reset();
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
                <form onSubmit={form.handleSubmit(cadastrarNivel)} className="mt-4">
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
                        <Button size="lg" >Cadastrar</Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
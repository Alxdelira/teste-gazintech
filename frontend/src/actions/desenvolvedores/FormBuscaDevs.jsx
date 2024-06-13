'use client'
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import Filtros from "@/components/app/Filtros";
import { Input } from "@/components/ui/input";
import { filtrar } from "@/utils/filtrar";




export default function FormBuscaDevs({ querys }) {
    const router = useRouter();
    const [isSearching, startTransition] = useTransition();
    const schema = z.object({
        nome: z.string().trim().optional(),          
        
    });

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            nome: querys?.nome,      
            
        }
        });

    async function buscarDevs(data) {
        startTransition(() => {
            filtrar("/desenvolvedores", data, router);
        });
    }

    return (
        <>
            <Form{...form}>
                <form className="mt-6" onSubmit={form.handleSubmit(buscarDevs)}>
                    <Filtros isSearching={isSearching} primeiroCampo={
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="nome">Nome</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="nome"
                                            placeholder="Nome"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    }>
                    </Filtros>
                </form>
            </Form>
        </>
    );

}
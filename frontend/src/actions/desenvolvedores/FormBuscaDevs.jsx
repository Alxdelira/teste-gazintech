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
        hobby: z.string().optional(),
        data_nascimento: z.string().optional(),
        sexo: z.string().optional(),
        nivel_id: z.number().optional()
    });

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            nome: querys?.nome,
            hobby: querys?.hobby,
            data_nascimento: querys?.data_nascimento,
            sexo: querys?.sexo,
            nivel_id: querys?.nivel_id
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
                        <FormField
                            control={form.control}
                            name="hobby"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="hobby">Hobby</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="hobby"
                                            placeholder="Hobby"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="data_nascimento"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="data_nascimento">Data de Nascimento</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="data_nascimento"
                                            type="date"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sexo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="sexo">Sexo</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="sexo"
                                            placeholder="Sexo"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nivel_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="nivel_id">Nível</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="nivel_id"
                                            placeholder="Nível"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </Filtros>
                </form>
            </Form>
        </>
    );

}
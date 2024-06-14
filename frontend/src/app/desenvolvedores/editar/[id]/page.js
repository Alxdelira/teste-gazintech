'use client'
import ComboboxAPI from "@/components/app/ComboBoxAPI";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";;
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchApi } from "@/utils/fetchClient";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { z } from "zod";
import { formatarDataInput, mascaraSexo } from "@/utils/mascara";
import { useRouter } from "next/navigation";
import actionRevalidateTag from "@/actions/actionRevalidateTag";


export default function EditarDesenvolvedor({ params }) {

    const [desenvolvedor, setDesenvolvedor] = useState(null);
    let router = useRouter();

    const schema = z.object({
        nome: z.string({ required_error: "O nome é obrigatorio" }).trim().min(1, { message: "O nome é obrigatorio" }),
        data_nascimento: z.string({ required_error: "A data de nascimento é obrigatorio" }).trim().min(1, { message: "A data de nascimento é obrigatorio" }),
        hobby: z.string().trim().optional(),
        sexo: z.string({ required_error: "O sexo é obrigatorio" }).min(1, { message: "O sexo é obrigatorio" }),
        nivel_id: z.object({ _id: z.string() }, { required_error: "O nivel é obrigatorio" })
    });

    const form = useForm({
        resolver: zodResolver(schema),
        values: {
            nome: desenvolvedor?.nome,
            data_nascimento: formatarDataInput(desenvolvedor?.data_nascimento),
            hobby: desenvolvedor?.hobby,
            sexo: desenvolvedor?.sexo,
        }

    });
    async function getDesenvolvedor() {
        try {
            const res = await fetchApi(`/desenvolvedores/${params?.id}`, 'GET');
            console.log(res);
            if (res.error) {
                toast.error(res.error.message);
            } else {
                setDesenvolvedor(res);
            }
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro inesperado, contate o Administrador");
        }
    }

    useEffect(() => {
        if(params?.id){
            getDesenvolvedor();           
        }

    },[params]);


    async function editarDesenvolvedor(data) {
        try {
            const res = await fetchApi(`/desenvolvedores/${params?.id}`, 'PUT', {
                nome: data?.nome,
                data_nascimento: data?.data_nascimento,
                hobby: data?.hobby,
                sexo: data?.sexo,
                nivel_id: data?.nivel_id?._id
            });

            if (res.error) {
                toast.error(res.message);
            } else {
                actionRevalidateTag('desenvolvedores');
                router.push("/desenvolvedores");
                toast.success("Desenvolvedor Atualizado com sucesso");
            }
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro inesperado, contate o Administrador");
        }
    }


    return (
        <>
            <h1 className="font-semibold text-2xl">Editar Desenvolvedor</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(editarDesenvolvedor)} className="mt-4">
                    <div className="grid grid-cols-3 gap-2">
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="nome">Nome</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="nome"
                                            placeholder="Nome"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="data_nascimento"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="data_nascimento">Data de nascimento</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="data_nascimento"
                                            type="date"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sexo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sexo</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione seu sexo" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="M">Masculino</SelectItem>
                                                <SelectItem value="F">Feminino</SelectItem>
                                                <SelectItem value="O">Outro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
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
                                        <ComboboxAPI
                                            endpointPrimary={"/niveis?nivel=input"}
                                            placeholderInputSearch={"Busque pelo nível"}
                                            placeholderUnselected={"Selecione o nível"}
                                            selecionado={field.value}
                                            setSelecionado={field.onChange}
                                            apiResponseAccess={"data"}
                                            endpointGetForId={"/niveis/id"}
                                            idGetForId={desenvolvedor?.nivel_id?._id}
                                            renderOption={(dados) => (
                                                <div className="flex flex-col w-full">
                                                    <span>{dados?.nivel}</span>
                                                </div>
                                            )}
                                            selectedField={(selecionado) => selecionado?.nivel}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="w-full flex gap-2 justify-end">
                        <Link href={"/desenvolvedores"} className="lg">
                            <Button variant="destructive" size="lg">Cancelar</Button>
                        </Link>
                        <Button size="lg"  >Atualizar</Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
'use client'
import ReactToastContainer from "@/components/app/ReactToastContainer";
import { Button } from "@/components/ui/button";
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";;
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchApi, postData } from "@/utils/fetchClient";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {  useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export default function CadastrarDesenvolvedor() {
    const schema = z.object({
        nome: z.string({ required_error: "o nome é obrigatorio" }).trim(),
        data_nascimento: z.string({ required_error: "a data de nascimento é obrigatorio" }),
        hobby: z.string().trim().optional(),
        sexo: z.string({ required_error: "o sexo é obrigatorio"}),
        idade: z.coerce.number({ required_error: "a idade é obrigatorio", invalid_type_error: "idade deve ser um número!"}),
    });

    const form = useForm({
        resolver: zodResolver(schema),
        
    });

    async function cadastrarDesenvolvedor(data) {
        try {
            const res = await fetchApi('desenvolvedores','POST', {
                nome: data?.nome,
                data_nascimento: data?.data_nascimento,
                hobby: data?.hobby,
                sexo: data?.sexo,
                idade: data?.idade,
                // nivel_id: data?.nivel_id
            });
            console.log(res); // Adicione este log para verificar a resposta
    
            if (res.error) {
                toast.error(res.error.message);
            } else {
                toast.success("Desenvolvedor cadastrado com sucesso");
                form.reset();
            }            
        } catch (error) {
            console.error(error); // Adicione este log para verificar se há erros
            toast.error("Ocorreu um erro inesperado, contate o Administrador");             
        }
    }
    
    
    return (
        <>
            <h1 className="font-semibold text-2xl">Cadastrar Desenvolvedor</h1>
            <ReactToastContainer />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(cadastrarDesenvolvedor)} className="mt-4">
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                            name="idade"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="idade">Idade</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="idade"
                                            type="number"
                                            placeholder="Idade"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                    </div>
                    <div className="w-full flex gap-2 justify-end">
                        <Link href={"/desenvolvedores"} className="lg">
                            <Button variant="destructive" size="lg">Cancelar</Button>
                        </Link>
                        <Button size="lg" >Cadastrar</Button>
                    </div>
                </form>
            </Form>
        </>
    );
}
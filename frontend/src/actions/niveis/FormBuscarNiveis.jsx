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




export default function FormBuscaNiveis({ querys }) {
    const router = useRouter();
    const [isSearching, startTransition] = useTransition();
    const schema = z.object({
        nivel: z.string().trim().optional(),          
        
    });

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            nivel: querys?.nivel,      
            
        }
        });

    async function buscarNivel(data) {
        startTransition(() => {
            filtrar("/niveis", data, router);
        });
    }

    return (
        <>
            <Form{...form}>
                <form className="mt-6" onSubmit={form.handleSubmit(buscarNivel)}>
                    <Filtros isSearching={isSearching} primeiroCampo={
                        <FormField
                            control={form.control}
                            name="nivel"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="nivel">Nível</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            id="nivel"
                                            placeholder="nível"
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
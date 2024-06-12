"use client";

import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import PaginationComponent from "@/components/app/PaginationComponent";

export default function DataTableDevs({ data, meta }) {
    const [modalVisualizar, setModalVisualizar] = useState(false);
    const [devSelecionado, setDevSelecionado] = useState(null);

    const handleVisualizar = (desenvolvedor) => {
        setModalVisualizar(true);
        setDevSelecionado(desenvolvedor);
    };

    const handleCloseModal = () => {
        setModalVisualizar(false);
        setDevSelecionado(null);
    };

    return (
        <>
            <section className="mt-4">
                <p>Total de Desenvolvedores: {meta.total} </p>
                <Table className="mt-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Data de nascimento</TableHead>
                            <TableHead>Hobby</TableHead>
                            <TableHead>Sexo</TableHead>
                            <TableHead>Nível</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((desenvolvedor) => (
                            <TableRow key={desenvolvedor.id}>
                                <TableCell>{desenvolvedor?.nome}</TableCell>
                                <TableCell>{desenvolvedor.data_nascimento}</TableCell>
                                <TableCell>{desenvolvedor.hobby}</TableCell>
                                <TableCell>{desenvolvedor.sexo}</TableCell>
                                <TableCell>{desenvolvedor.nivel.nivel}</TableCell>
                                {console.log(desenvolvedor)}
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                            <DropdownMenuItem
                                                onClick={() => handleVisualizar(desenvolvedor)}
                                                className="flex gap-2"
                                            >
                                                <Eye className="h-4 w-4" /> Visualizar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="flex gap-2">
                                                <Pencil className="h-4 w-4" /> Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="flex gap-2">
                                                <Trash2 className="h-4 w-4" /> Excluir
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>

            {meta.total > 1 && (
                <PaginationComponent
                    route={"/desenvolvedores"}
                    currentPage={meta.current_page}
                    totalPages={meta.last_page}
                    querys={meta.querys}
                />
            )}

            {/* Ative o Modal quando necessário */}
            {/* <Modal isOpen={modalVisualizar} onClose={handleCloseModal} title={"Visualizar Desenvolvedor"} className={"w:5/6 lg:w-4/6 max-h-[90%]"}>
                <VisualizarDesenvolvedor desenvolvedor={devSelecionado} />
            </Modal> */}
        </>
    );
}

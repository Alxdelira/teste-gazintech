"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import PaginationComponent from "@/components/app/PaginationComponent";
import { useState } from "react";
// import Modal from "@/components/app/Modal";
// import VisualizarAbastecimento from "./VisualizarAbastecimento";
// import AlertWarning from "@/components/app/AlertWarning";

export default function DataTableDevs({dados, searchParams}) {

    const [modalVisualizar, setModalVisualizar] = useState(false);
    const [devSelecionado, setDevSelecionado] = useState();
    console.log(dados.value.data)

    return (
        <>
            <section className="mt-4">
                <p>Total de Desenvolvedores:{dados.desenvolvedores?.meta?.total}</p>
                <Table className="mt-2">
                    <TableHeader>
                        <TableRow>
                            {/* <TableHead>Motorista</TableHead> */}
                            <TableHead>Nome</TableHead>
                            <TableHead>Data de nascimento</TableHead>
                            <TableHead>Hobby</TableHead>
                            <TableHead>Sexo</TableHead>
                            <TableHead>Nivel</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>nome  </TableCell>
                            <TableCell>nome</TableCell>
                            <TableCell>nome</TableCell>
                            <TableCell>nome</TableCell>
                            <TableCell>nome</TableCell>
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
                                        <DropdownMenuItem onClick={() => {
                                            setModalVisualizar(true)
                                            setDevSelecionado(desenvolvedor)
                                        }} className="flex gap-2">
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
                    </TableBody>
                </Table>
            </section>


            {/* {dados?.totalPaginas > 1 && (
                <PaginationComponent
                    route={"/desenvolvedores"}
                    currentPage={dados?.pagina}
                    totalPages={dados?.totalPaginas}
                    querys={searchParams}
                />
            )} */}

            {/* <Modal isOpen={modalVisualizar} onClose={setModalVisualizar} title={"Visualizar abastecimento"} className={"w:5/6 lg:w-4/6 max-h-[90%]"}>
        <VisualizarAbastecimento abastecimento={abastecimentoSelecionado}/>
      </Modal> */}
        </>
    )
}

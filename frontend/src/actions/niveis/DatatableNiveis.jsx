'use client'
import { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import { toast } from 'react-toastify';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, MoreHorizontal, Pencil, Trash2, ArrowUpDown } from "lucide-react";
import PaginationComponent from "@/components/app/PaginationComponent";
import Modal from "@/components/app/Modal";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { fetchApi } from "@/utils/fetchClient";
import actionRevalidateTag from "../actionRevalidateTag";
import VisualizarNivel from "./VisualizarNivel";
import { useRouter } from "next/navigation";

export default function DataTableNiveis({ data, meta, searchParams }) {
    let router = useRouter();
    const [modalVisualizar, setModalVisualizar] = useState(false);
    const [modalRemover, setModalRemover] = useState(false);
    const [nivelSelecionado, setNivelSelecionado] = useState(null);

    async function removeNivel() {
        try {
            const res = await fetchApi(`/niveis/${nivelSelecionado?._id}`, 'DELETE');
            if (res.error) {
                toast.error(res.message);
            } else {
                toast.success("Nível removido com sucesso");
                actionRevalidateTag('niveis');
            }
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro inesperado, contate o Administrador");
        } finally {
            setModalRemover(false);
            setNivelSelecionado(null);
        }
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: "nivel",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting()}
                    >
                        Nível
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
            }, {
                accessorKey: "total_developers",
                header: ({ column }) => (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting()}
                    >
                        Quantidade Desenvolvedores
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                ),
            },
            {
                id: "actions",
                cell: ({ row }) => (
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
                                onClick={() => handleVisualizar(row.original)}
                                className="flex gap-2"
                            >
                                <Eye className="h-4 w-4" /> Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleEditar(row.original)}
                                className="flex gap-2"
                            >
                                <Pencil className="h-4 w-4" /> Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => handleRemover(row.original)}
                                className="flex gap-2"
                            >
                                <Trash2 className="h-4 w-4" /> Excluir
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        []
    );

    const niveis = useMemo(() => {
        return data.map((item) => ({
            _id: item._id,
            nivel: item.nivel,
        }));
    }, [data]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const handleVisualizar = (nivel) => {
        setModalVisualizar(true);
        setNivelSelecionado(nivel);
    };

    const handleCloseModal = () => {
        setModalVisualizar(false);
        setNivelSelecionado(null);
    };

    const handleRemover = (nivel) => {
        setModalRemover(true);
        setNivelSelecionado(nivel);
    }

    const handleEditar = (nivel) => {
        router.push(`/niveis/editar/${nivel._id}`);
    }


    return (
        <>
            <section className="mt-4">
                <p>Total de Desenvolvedores: {meta.total} </p>
                <Table className="mt-2">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>

            {meta.total > 1 && (
                <PaginationComponent
                    route={"/niveis"}
                    currentPage={meta.current_page}
                    totalPages={meta.last_page}
                    querys={searchParams}
                />
            )}
            <Modal
                isOpen={modalVisualizar}
                onClose={handleCloseModal}
                title={"Visualizar Nível"}
                className={"w:5/6 lg:w-4/6 max-h-[90%]"}
            >
                <VisualizarNivel nivel={nivelSelecionado} />
            </Modal>

            <Dialog open={modalRemover} onOpenChange={setModalRemover}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Remover Nível</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <DialogDescription>
                            Tem certeza que deseja remover o nível?
                        </DialogDescription>
                    </div>
                    <DialogFooter>
                        <Button variant="destructive" onClick={removeNivel}>Remover</Button>
                        <Button onClick={() => setModalRemover(false)}>Cancelar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

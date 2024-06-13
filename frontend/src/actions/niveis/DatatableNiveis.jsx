'use client'
import { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
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
// import VisualizarDesenvolvedor from "./VisualizarDesenvolvedor";

export default function DataTableNiveis({ data, meta, searchParams }) {
    const [modalVisualizar, setModalVisualizar] = useState(false);
    const [devSelecionado, setDevSelecionado] = useState(null);
    const [sorting, setSorting] = useState([]);

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
            },
            {
                accessorKey: "desenvolvedor_id",
                header: "Quantidade Desenvolvedor",
                cell: ({ row }) => (row.getValue("desenvolvedor_id") || "Nenhum Desenvolvedor"),
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
                            <DropdownMenuItem className="flex gap-2">
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
                title={"Visualizar Desenvolvedor"}
                className={"w:5/6 lg:w-4/6 max-h-[90%]"}
            >
                {/* <VisualizarDesenvolvedor desenvolvedor={devSelecionado} /> */}
            </Modal>
        </>
    );
}

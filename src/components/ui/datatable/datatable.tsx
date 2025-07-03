"use client";

import React from "react";
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
    type FilterFnOption,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "../button";


function normalizeString(value: string, whiteSpaceReplace = "-") {
    const alphabetSpecialChars = "àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;";
    const alphabetCommonChars = "aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";

    const normalizedValue = value
        .trim()
        .toLowerCase()
        .trim()
        .replace(/ /g, whiteSpaceReplace)
        .replace(/--/g, "-")
        .replace(/[&/\\#,+()$~%.'":*?<>{}\[\]]/g, "")
        .replace(new RegExp(alphabetSpecialChars.split("").join("|"), "g"), (c) =>
            alphabetCommonChars.charAt(alphabetSpecialChars.indexOf(c))
        );

    return normalizedValue;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageSize?: number;
    searchFields?: string[];
    defaultSearch?: string;
    searchPlaceholder?: string;
    onRowClick?: (row: TData) => void
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pageSize = 5,
    searchFields = [],
    defaultSearch = "",
    onRowClick
}: DataTableProps<TData, TValue>) {
    const [globalFilter, setGlobalFilter] = React.useState(defaultSearch);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        filterFns: {
            fuzzy: (row, _, value) => {
                const data = row.original;
                const search = normalizeString(value);

                return searchFields.some((field) =>
                    normalizeString(data[field].toString()).includes(search)
                );
            },
        },
        globalFilterFn: "fuzzy" as FilterFnOption<TData>,
        state: {
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize,
            },
        },
    });

return (
    <div>
        {/* Tabela */}
        <div className="rounded-md border-white overflow-x-auto">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow className="border-white" key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="text-gray-950 font-bold w-[200px] max-w-[200px] truncate"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        <>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-white"
                                    onClick={() => onRowClick?.(row.original)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="w-[200px] max-w-[200px] truncate"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}

                            {/* Linhas vazias com altura igual */}
                            {Array.from({
                                length: pageSize - table.getRowModel().rows.length,
                            }).map((_, idx) => (
                                <TableRow key={`empty-${idx}`} className="border-white h-19">
                                    {columns.map((_, colIdx) => (
                                        <TableCell
                                            key={colIdx}
                                            className="w-[200px] max-w-[200px] opacity-0 select-none"
                                        >
                                            Placeholder
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </>
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                Sem resultados.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>

        {/* Paginação */}
        {data.length > pageSize && (
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Próxima
                </Button>
            </div>
        )}
    </div>
);


}
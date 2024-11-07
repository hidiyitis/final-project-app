    "use client"

    import { Switch } from "../ui/switch"
    import * as React from "react"
    import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    } from "@tanstack/react-table"
    import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

    import { Button } from "@/components/ui/button"
    import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu"
    import { Input } from "@/components/ui/input"
    import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    } from "@/components/ui/table"

    const data: Task[] = [
    {
        id: "task1",
        workerName: "John Doe",
        service: "Layanan Kebersihan Rumah",
        status: "dalam pengerjaan",
        email: "ken99@yahoo.com",
    },
    {
        id: "task2",
        workerName: "Abe Smith",
        service: "Pembersihan Kantor",
        status: "selesai",
        email: "Abe45@gmail.com",
    },
    {
        id: "task3",
        workerName: "Monserrat R.",
        service: "Layanan Pembersihan Rumah Tangga",
        status: "dalam pengerjaan",
        email: "Monserrat44@gmail.com",
    },
    {
        id: "task4",
        workerName: "Silas Lee",
        service: "Layanan Pembersihan Jalan",
        status: "selesai",
        email: "Silas22@gmail.com",
    },
    {
        id: "task5",
        workerName: "Carmella S.",
        service: "Layanan Kebersihan Apartemen",
        status: "dalam pengerjaan",
        email: "carmella@hotmail.com",
    },
    {
        id: "task6",
        workerName: "Lucas H.",
        service: "Layanan Pembersihan Gedung",
        status: "selesai",
        email: "lucas.h@example.com",
    },
    {
        id: "task7",
        workerName: "Eve N.",
        service: "Pembersihan Lingkungan",
        status: "dalam pengerjaan",
        email: "eve.n@example.com",
    },
    {
        id: "task8",
        workerName: "Chris P.",
        service: "Layanan Pembersihan Industri",
        status: "selesai",
        email: "chris.p@example.com",
    },
    ]

    export type Task = {
    id: string
    workerName: string
    service: string
    status: "dalam pengerjaan" | "selesai"
    email: string
    }

    export const columns: ColumnDef<Task>[] = [
    {
        id: "select",
        cell: ({ row }) => (
        <Switch
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
        />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "workerName",
        header: "Nama Pekerja",
        cell: ({ row }) => <div>{row.getValue("workerName")}</div>,
    },
    {
        accessorKey: "service",
        header: "Layanan",
        cell: ({ row }) => <div>{row.getValue("service")}</div>,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
        const task = row.original

        return (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(task.id)}
                >
                Salin ID Pekerjaan
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Lihat Pekerja</DropdownMenuItem>
                <DropdownMenuItem>Lihat Detail Pekerjaan</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        )
        },
    },
    ]

    export default function DataTableDemo() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
        },
    })

    return (
        <div className="w-full">
        <div className="flex items-center py-4">
            <Input
            placeholder="Cari nama pekerja..."
            value={(table.getColumn("workerName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("workerName")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                Lihat Dengan <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                    return (
                    <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                        }
                    >
                        {column.id}
                    </DropdownMenuCheckboxItem>
                    )
                })}
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className="rounded-md border">
            <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                    return (
                        <TableHead key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </TableHead>
                    )
                    })}
                </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    >
                    {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                        </TableCell>
                    ))}
                    </TableRow>
                ))
                ) : (
                <TableRow>
                    <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                    >
                    No results.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
            </div>
        </div>
        </div>
    )
    }

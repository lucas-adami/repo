import type { IProduct } from "@/interface/IProduct";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "../button";
import { DataTable } from "./datatable";
import { ActionModal } from "@/components/molecules/actionModal";
import { deleteProduct } from "@/services/product/productService";

interface Props {
    data: IProduct[]
    setObjectToEdit: (product: IProduct) => void
    refreshData: () => void
}


export const ProductDataTable = ({ data, setObjectToEdit, refreshData }: Props) => {

    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedId, setSelectedId] = useState<number | null>(null)

    const handleDelete = async () => {
        console.log(selectedId)
        if (selectedId !== null) {
            try {
                await deleteProduct(selectedId)
                toast.success("Product deleted with success!")
                setDeleteModal(false)
                refreshData()
            } catch (error) {
                console.error(error)
                toast.error("Error on deleting product :(")
            }
        }
    }

    const columns = useMemo<ColumnDef<IProduct>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                cell: ({ row }) => <div>{row.getValue("name")}</div>,
                size: 1
            },

            {
                accessorKey: "description",
                header: "Description",
                cell: ({ row }) => <div>{row.getValue("description")}</div>,
                size: 1
            },
            {
                accessorKey: "price",
                header: "Price",
                cell: ({ row }) =>
                    <div className="flex">
                        <p className="pr-1">USD</p>
                        {row.getValue("price")}
                    </div>,
                size: 1
            },
            {
                accessorKey: "actions",
                header: "Actions",
                cell: ({ row }) => {
                    const product = row.original as IProduct;
                    return (
                        <div className="flex p-3">
                            <Button
                                className="mr-3"
                                onClick={() => {
                                    setObjectToEdit(product);
                                }}
                            >
                                ✏️
                            </Button>
                            <Button
                                onClick={() => {
                                    setSelectedId(product?.id ?? null);
                                    setDeleteModal(true);
                                }}
                            >
                                🗑️
                            </Button>
                        </div>
                    );
                },
            },

        ], [setObjectToEdit]
    )



    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                pageSize={5}
                searchFields={["name", "description", "price"]}
            />

            {/* deletar 🗑️ */}
            <ActionModal
                title="Delete Product"
                description="Atention, are you sure that want to delete this object?"
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                onSubmit={handleDelete}
            />
        </div>
    )
}
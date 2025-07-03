import ArrowBack from "@/assets/arrowBack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { IProduct } from "@/interface/IProduct";
import { postProduct, updateProduct } from "@/services/product/productService";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
    productToEdit: IProduct | null;
    setProductToEdit: (product: IProduct | null) => void
    refreshProductData: () => void
}

export const ProductForm = ({ productToEdit, setProductToEdit, refreshProductData }: Props) => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)

    useEffect(() => {
        if (productToEdit) {
            console.log(productToEdit)
            setName(productToEdit.name)
            setDescription(productToEdit.description)
            setPrice(productToEdit.price)
        }
        else {
            setName("")
            setDescription("")
            setPrice(0)
        }
    }, [productToEdit])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {

            const product: IProduct = { name, description, price }

            if (productToEdit && productToEdit.id) {
                await updateProduct(productToEdit.id, product)
                setProductToEdit(null)
                toast.success("Produto Editado com Sucesso!")
            }
            else {
                console.log(product)
                await postProduct(product)
                toast.success("Produto Cadastrado com Sucesso!")
            }

            refreshProductData()
            setName("")
            setDescription("")
            setPrice(0)
        } catch (error) {
            console.error(error)
            toast.error("Error on submiting product")
        }

    }

    return (
        <form onSubmit={handleSubmit} className="w-full border-1 border-gray-500 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-orange-500 text-xl" >
                    {productToEdit
                        ? `Update Product: ${productToEdit.id}`
                        : "Create Product:"}
                </p>

                {/* Opção caso queira voltar ao registro de produtos...*/}
                {productToEdit && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setProductToEdit(null)}
                        title="Back to Create Form"
                    >
                        <ArrowBack />
                    </Button>
                )}
                {/*##*/}
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <Label className="text-sm font-medium mb-1">Name</Label>
                    <Input
                        type="text"
                        placeholder="Write the product's name"
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <Label className="text-sm font-medium mb-1">Description</Label>
                    <Input
                        type="text"
                        placeholder="write a description abou your product"
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <Label className="text-sm font-medium mb-1">Price</Label>
                    <Input
                        type="number"
                        min={0}
                        placeholder="Write an e-mail"
                        className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                    />
                </div>

                <Button type="submit" variant="ghost" className="text-white border-gray-500 border-1">
                    {productToEdit ? "Update" : "Create"}
                </Button>
            </div>
        </form>
    )
}
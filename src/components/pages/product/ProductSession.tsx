import ArrowBack from "@/assets/arrowBack"
import type { IProduct } from "@/interface/IProduct"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ProductForm } from "./ProductForm"
import { ProductDataTable } from "@/components/ui/datatable/product-datatable"
import { useData } from "@/hooks/useData"
import { getProducts } from "@/services/product/productService"

export const ProductSession = () => {

    const navigate = useNavigate()

    const [productToEdit, setProductToEdit] = useState<IProduct | null>(null)
    const { data: products, refreshData } = useData<IProduct>({ getFn: getProducts })


    return (
        <div className="flex  w-full justify-center">

            <div className="flex justify-center bg-[#1c1c1c] w-3/4 rounded-sm p-10 border-1 border-gray-700 ">
                <ArrowBack onClick={() => navigate(-1)} className="cursor-pointer h-4 mb-10" />

                <div className="w-1/3 flex flex-col justify-center ">
                    <div>
                        <ProductForm productToEdit={productToEdit} setProductToEdit={setProductToEdit} refreshProductData={refreshData} />
                    </div>
                </div>


                <div className=" pl-10">
                    <ProductDataTable data={products} refreshData={refreshData} setObjectToEdit={setProductToEdit} />
                </div>

            </div>
        </div>
    )
}
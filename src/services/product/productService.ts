import type { IProduct } from "@/interface/IProduct";
import { api } from "../http";

export const getProducts = async (): Promise<IProduct[]> => {
    const response = await api.get("/product")

    return response.data
}

export const postProduct = async (product: IProduct) => {
    const response = await api.post("/product", product)

    return response.data
}

export const updateProduct = async (productId: number, product: IProduct) => {
    const response = await api.put(`/product/${productId}`, product)

    return response.data
}

export const deleteProduct = async (productId: number) => {
    const response = await api.delete(`/product/${productId}`)

    return response.data
}
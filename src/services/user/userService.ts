import type { IUser } from "../../interface/IUser"
import { api } from "../http"

export const postUser = async (data: IUser) => {
    const response = await api.post("/usuarios", data)

    return response.data
}

export const deleteUser = async (id: string) => {
    const response = await api.delete(`/usuarios/${id}`)

    return response.data
}

export const updateUser = async (id: string, data: {name?: string, email?: string}) => {
    const response = await api.put(`/usuarios/${id}`, data)

    return response.data

}


export const getUsers = async () => {
    const response = await api.get("/usuarios")

    return response.data
}
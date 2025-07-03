import { useState, useCallback, useEffect } from "react"
import { getUsers } from "@/services/user/userService"
import type { IUser } from "@/interface/IUser"
import { toast } from "sonner"

export const useUsersData = () => {
    const [users, setUsers] = useState<IUser[]>([])

    const refreshUsersData = useCallback(async () => {
        try {
            const data = await getUsers()
            setUsers(data)
        } catch (error) {
            console.error(error)
            toast("Erro ao carregar usuários")
        }
    }, [])

    useEffect(() => {
        refreshUsersData()
    }, [refreshUsersData])

    return { users, refreshUsersData }
}

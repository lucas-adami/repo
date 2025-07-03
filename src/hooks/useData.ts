import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

type DataProps<T> = {
    getFn: () => Promise<T[]>
}

export const useData = <T,>({ getFn }: DataProps<T>) => {
    const [data, setData] = useState<T[]>([])

    const refreshData = useCallback(async () => {
        try {
            const response = await getFn()
            setData(response)
        } catch (error) {
            console.error(error)
            toast.error("Error on getting data")
        }
    }, [getFn])

    useEffect(() => {
        refreshData()
    }, [refreshData])

    return { data, refreshData }
}

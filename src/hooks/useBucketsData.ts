import { useState, useCallback, useEffect } from "react"
import { toast } from "sonner"
import { getBuckets } from "@/services/buckets/bucketService"
import type { IBucket } from "@/interface/IBucket"

export const useBucketsData = () => {
    const [buckets, setBuckets] = useState<IBucket[]>([])

    const refreshBucketsData = useCallback(async () => {
        try {
            const data = await getBuckets()
            setBuckets(data)
        } catch (error) {
            console.error(error)
            toast.error("Erro ao carregar buckets s3")
        }
    }, [])

    useEffect(() => {
        refreshBucketsData()
    }, [refreshBucketsData])

    return { buckets, refreshBucketsData }
}

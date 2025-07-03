import type { IBucketContent } from "@/interface/IBucketContent";
import { getBucketContentByName } from "@/services/buckets/bucketService"
import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner";

export const useBucketContentData = (name: string) => {

    const [contents, setContents] = useState<IBucketContent[]>(
        [] as IBucketContent[]
    );

    const refreshBucketContentData = useCallback(async () => {
        try {
            const data = await getBucketContentByName(name)
            setContents(data)
        } catch (error) {
            console.error(error)
            toast.error(`Erro ao buscar o conteúdo do bucket ${name}`)
        }

    }, [])

    useEffect(() => {
        refreshBucketContentData()
    }, [refreshBucketContentData])

    return { contents, refreshBucketContentData }
}



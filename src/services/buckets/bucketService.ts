import { api } from "../http";
import type { IBucketContent } from "@/interface/IBucketContent";

export const getBuckets = async () => {
  const response = await api.get("/buckets");
  return response.data;
};

export const getBucketContentByName = async (
  name: string
): Promise<IBucketContent[]> => {
  const response = await api.get(`/buckets/${name}`);
  return response.data;
};

export const postBucketContent = async (name: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const respose = await api.post(`/buckets/${name}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return respose.data;
};


export const deleteBucketContent = async (bucketName: string, contentKey: string) => {
  const response = await api.delete(`/buckets/${bucketName}/file/${contentKey}`)
  
  return response.data
}

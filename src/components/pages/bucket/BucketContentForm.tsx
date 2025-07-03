import { postBucketContent } from "@/services/buckets/bucketService";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Upload } from "lucide-react";

type Props = {
    refreshData: () => void
    bucketName: string
}

export const BucketContentForm = ({ refreshData, bucketName }: Props) => {

    const [file, setFile] = useState<File>()

    const handleSubmit = async () => {
        try {
            if (file)
                await postBucketContent(bucketName, file);
            refreshData()
            toast.success("File sent with success!")
        } catch (error) {
            console.error(error);
            toast("Error on sending file");
        }
    };

    return (
        <div>
            <p className="text-2xl font-semibold">Upload new file</p>
            <div className="flex items-center p-1 border-1 rounded-lg bg-gray-200 text-black">

                <Input
                    type="file"
                    accept=".jpg, .png"
                    className="border-0 cursor-pointer  hover:bg-gray-400 transition duration-200 ease-in-out"
                    onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile) setFile(selectedFile);
                    }}
                    required
                />
                <Button variant={"secondary"} onClick={handleSubmit} disabled={!file}>
                    <Upload className="mr-3" />
                    Upload
                </Button>
            </div>
        </div>


    )

}
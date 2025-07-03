import { useNavigate, useParams } from "react-router-dom";
import BucketContentDatatable from "../../ui/datatable/bucket-content-datatable";

import { useBucketContentData } from "@/hooks/useBucketContentData";
import { BucketContentForm } from "./BucketContentForm";
import ArrowBack from "@/assets/arrowBack";

export const BucketSession = () => {
  const navigate = useNavigate()

  const { name } = useParams<{ name: string }>();
  if (!name) return <div>Parâmetro "name" ausente</div>;

  const { contents, refreshBucketContentData } = useBucketContentData(name)

  return (
    <div className="h-1/2">
      <ArrowBack onClick={() => navigate(-1)} className="cursor-pointer h-4 mb-10" />
      <h1 className="font-bold text-orange-500" style={{ WebkitTextStroke: "1px white" }}>Data from Bucket: {name}</h1>
      <div>
        <BucketContentDatatable
          bucketName={name}
          contents={contents}
          refreshContents={refreshBucketContentData}
        />

        <BucketContentForm
          refreshData={refreshBucketContentData}
          bucketName={name} />
      </div>
    </div>
  );
};

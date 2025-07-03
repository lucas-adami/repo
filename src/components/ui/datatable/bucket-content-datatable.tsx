"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../button";
import { useMemo, useState } from "react";

import { DataTable } from "./datatable";
import { ActionModal } from "@/components/molecules/actionModal";
import type { IBucketContent } from "@/interface/IBucketContent";
import { deleteBucketContent } from "@/services/buckets/bucketService";
import { toast } from "sonner";

interface Props {
  bucketName: string
  contents: IBucketContent[];
  refreshContents: () => void;
}

export default function BucketContentDatatable({
  bucketName,
  contents,
  refreshContents,
}: Props) {
  //delete modal🗑️
  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleDelete = async () => {
    if (selectedKey !== null) {
      try {
        await deleteBucketContent(bucketName, selectedKey);
        setDeleteModal(false);
        toast.success("Object deleted with sucess")
        refreshContents();
      } catch (err) {
        console.error("Erro on deleting:", err);
      }
    }
  };

  const columns = useMemo<ColumnDef<IBucketContent>[]>(
    () => [
      {
        accessorKey: "Key",
        header: "Key",
        cell: ({ row }) => <div>{row.getValue("Key")}</div>,
        size: 1,
      },
      {
        accessorKey: "LastModified",
        header: "Last Modified",
        cell: ({ row }) => <div>{row.getValue("LastModified")}</div>,
        size: 1,
      },
      {
        accessorKey: "ChecksumAlgorithm",
        header: "Checksum Algorithm",
        cell: ({ row }) => <div>{row.getValue("ChecksumAlgorithm")}</div>,
        size: 1,
      },
      {
        accessorKey: "Size",
        header: "Size",
        cell: ({ row }) => <div>{row.getValue("Size")}</div>,
        size: 1,
      },
      {
        accessorKey: "StorageClass",
        header: "StorageClass",
        cell: ({ row }) => <div>{row.getValue("StorageClass")}</div>,
        size: 1,
      },

      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const content = row.original as IBucketContent;
          return (
            <div className="flex p-3">
              <Button
                onClick={() => {
                  setSelectedKey(content?.Key ?? null);
                  setDeleteModal(true);
                }}
              >
                🗑️
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div>
      <DataTable columns={columns} data={contents} pageSize={5} />

      {/* deletar 🗑️ */}
      <ActionModal
        title="Delete Content"
        description="Atention, are you sure that want to delete this object?"
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        onSubmit={handleDelete}
      />
    </div>
  );
}

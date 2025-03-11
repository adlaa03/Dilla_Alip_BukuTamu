/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PostModel } from "../types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDeletepost } from "../utils/hooks/post";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DataTable({ data }: { data: PostModel[] }) {
  const router = useRouter();
  const mutationDelete = useDeletepost();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    toast(
      "Apakah Anda yakin akan menghapus data user? Jika data dihapus, tidak bisa dikembalikan.",
      {
        action: {
          label: "Iya, Hapus",
          onClick: () => onDelete(id),
        },
        cancel: {
          label: "Tidak",
          onClick: () => setDeleteId(null),
        },
      }
    );
  };
  const onDelete = (id: number) => {
    mutationDelete.mutate(
      { id },
      {
        onSuccess: () => {
          toast.success("Data Berhasil Dihapus!");
          router.refresh();
        },
        onError: (error) => {
          toast.error(
            "Gagal menghapus data: " + (error?.message || "Terjadi kesalahan")
          );
        },
      }
    );
  };

  const columns: ColumnDef<PostModel>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "username", header: "Username" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "phone", header: "Phone" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="destructive"
            size="sm"
            className="bg-red-500 text-white"
            onClick={() => confirmDelete(row.original.id)}
          >
            Delete
          </Button>
          <Link href={`/post/${row.original.id}/edit`}>
            <Button
              variant="outline"
              size="sm"
              className="bg-yellow-500 text-white"
            >
              Edit
            </Button>
          </Link>
          <Link href={`/post/${row.original.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-500 text-white"
            >
              View
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-x-auto">
      <div
        className="border border-[#3C2A21] w-full overflow-hidden"
        style={{ borderColor: "#3C2A21" }}
      >
        <Table className="w-full border-collapse">
          <TableHeader className="bg-[#D5CEA3] border-b-2 border-[#3C2A21]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-bold border-b text-center border border-[#3C2A21]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border border-[#3C2A21]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border border-[#3C2A21]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow style={{ borderColor: "#3C2A21" }}>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

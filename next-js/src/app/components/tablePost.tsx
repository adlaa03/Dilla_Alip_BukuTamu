"use client";

import React from "react";
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
// import { mutate } from "swr";
// import Swal from "sweetalert2";

// const DELETE = async (id: number) => {
//   try {
//     const res = await fetch(`/utils/queries/users/${id}`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//     });

//     const content = await res.json();
//     console.log("DELETE Response:", content);

//     if (!res.ok) {
//       console.error("Server Error:", content);
//       throw new Error(`Error: ${res.status} ${res.statusText}`);
//     }

//     if (res.status === 200 && content.message.includes("Berhasil Dihapus")) {
//       console.log("User successfully deleted.");
//       mutate(`/utils/queries/users`);
//       return true;
//     } else {
//       console.error("Unexpected response format:", content);
//       return false;
//     }
//   } catch (error) {
//     console.error("Failed to delete post:", error);
//     return false;
//   }
// };

export default function DataTable({ data }: { data: PostModel[] }) {
  const router = useRouter();
  const mutationDelete = useDeletepost();

  const onDelete = (id: number) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus data ini?"
    );

    if (!isConfirmed) return;

    mutationDelete.mutate(
      { id },
      {
        onSuccess: () => {
          alert("Data Berhasil Dihapus!");
          router.refresh();
        },
        onError: (error) => {
          alert(
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
            onClick={() => onDelete(row.original.id)}
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

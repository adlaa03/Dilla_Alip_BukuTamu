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
import { mutate } from "swr";

const DELETE = async (id: number) => {
  try {
    const res = await fetch(`/utils/queries/users/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const content = await res.json();
    console.log("DELETE Response:", content);

    if (!res.ok) {
      console.error("Server Error:", content);
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    if (res.status === 200 && content.message.includes("Berhasil Dihapus")) {
      console.log("User successfully deleted.");
      mutate(`/utils/queries/users`);
    } else {
      console.error("Unexpected response format:", content);
    }
  } catch (error) {
    console.error("Failed to delete post:", error);
  }
};

export default function DataTable({ data }: { data: PostModel[] }) {
  const columns: ColumnDef<PostModel>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "username", header: "Username" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "phone", header: "Phone" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <TableCell className="flex gap-2">
          <Button
            variant="destructive"
            size="sm"
            className="bg-red-500 text-white"
            onClick={() => {
              const confirmDelete = window.confirm(
                "Apakah kamu yakin akan menghapus user ini?"
              );
              if (confirmDelete) {
                DELETE(row.original.id);
              }
            }}
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
        </TableCell>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex justify-center">
      <div className="rounded-md border">
        <Table className="border-collapse">
          <TableHeader className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-bold border-b">
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-b border-r">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
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

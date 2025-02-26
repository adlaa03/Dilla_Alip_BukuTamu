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
import { Button } from "@/components/button";
// import { DELETE } from "../utils/queries/users/[id]/route";
import Link from "next/link";
import { mutate } from "swr";

// const delete_Post: PostModel["deletePost"] = async (id: number) => {
const DELETE = async (post: { id: number }) => {
  const res = await fetch(`/utils/queries/users/${post.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const content = await res.json();

  if (content.success > 0) {
    mutate(`/utils/queries/users`);
  }
  // if (content.success > 0) {
  //   // setUsers(users.filter((user: PostModel) => user.id !== id));
  //   setUsers(users.filter((user) => user.id !== id));
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
            onClick={() => DELETE(row.original)}
          >
            Delete
          </Button>
          <Link href={`/post/edit/${row.original.id}`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          <Link href={`/post/read/${row.original.id}`}>
            <Button variant="outline" size="sm">
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
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                    <TableCell key={cell.id}>
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

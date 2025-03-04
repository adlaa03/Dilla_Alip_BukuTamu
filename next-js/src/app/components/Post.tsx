import React from "react";
import Link from "next/link";
import { PostModel } from "../types";

export default function Post(params: PostModel) {
  return (
    <tr>
      <td className="w-10 border border-slate-300 text-center">{params.id}</td>
      <td className="border border-slate-300">{params.username}</td>
      <td className="border border-slate-300 text-center">{params.name}</td>
      <td className="border border-slate-300">{params.address}</td>
      <td className="border border-slate-300 text-center">{params.phone}</td>
      <td className="w-52 border border-slate-300">
        <span
          onClick={() => params.deletePost(params.id)}
          className="bg-red-500 p-2 inline-block text-white text-sm"
        >
          Delete
        </span>

        <Link
          href={`/post/${params.id}/edit`}
          className="bg-yellow-500 p-2 inline-block ml-3 text-white text-sm"
        >
          Edit
        </Link>

        <Link
          href={`/post/${params.id}`}
          className="bg-yellow-500 p-2 inline-block ml-3 text-white text-sm"
        >
          View
        </Link>
      </td>
    </tr>
  );
}

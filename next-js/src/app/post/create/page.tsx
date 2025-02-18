// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// export default function UserCreate() {
//   const router = useRouter();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   // const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const addUser = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!title || !content) {
//       alert("Semua field harus diisi!");
//       return;
//     }
//     try {
//       setLoading(true);
//       const formData = { title, content };
//       const res = await fetch("/api/person", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const content = await res.json();
//       console.log("Response:", content);
//       if (content.success) {
//         alert("Gagal" + content.message);
//       } else {
//         alert("Berhasil: " + content.message);
//         router.push("/person");
//       }
//     } catch (error) {
//       console.error("Error saat menambahkan user:", error);
//       alert("Terjadi kesalahan. Cek console untuk detail.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="w-full max-w-7xl m-auto">
//       <form className="w-full" onSubmit={addUser}>
//         <span className="font-bold text-yellow-500 py-2 block underline text-2xl">
//           Form Add
//         </span>

//         <div className="w-full py-2">
//           <label className="text-sm font-bold py-2 block">Title</label>
//           <input
//             type="text"
//             name="title"
//             className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div className="w-full py-2">
//           <label className="text-sm font-bold py-2 block">Content</label>
//           <textarea
//             name="content"
//             className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//           />
//         </div>
//         {/* <div className="w-full py-2">
//                     <label className="text-sm font-bold py-2 block">Phone</label>
//                     <input
//                         type="text"
//                         name="phone"
//                         className="w-full border-[1px] border-gray-200 p-2 rounded-sm"
//                         value={phone}
//                         onChange={(e) => setPhone(e.target.value)}
//                     />
//                 </div> */}
//         <div className="w-full py-2">
//           <button
//             type="submit"
//             className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400"
//             disabled={loading}
//           >
//             {loading ? "Loading..." : "Submit"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

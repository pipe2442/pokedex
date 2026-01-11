// "use client";

// export default function Home() {
//   const testLogin = async () => {
//     const res = await fetch("http://localhost:8000/login", {
//       method: "POST",
//       credentials: "include", // ⬅️ importantísimo
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ login: "admin", password: "admin" }),
//     });

//     console.log("login status", res.status);
//   };
//   const testDashboard = async () => {
//     const res = await fetch("http://localhost:8000/dashboard", {
//       credentials: "include",
//     });

//     const data = await res.json();
//     console.log("dashboard status", res.status);
//     console.log("dashboard data", data);
//   };

//   const testMe = async () => {
//     const res = await fetch("http://localhost:8000/me", {
//       credentials: "include",
//     });
//     const data = await res.json();
//     console.log("me status", res.status);
//     console.log("me data", data);
//   };

//   // make a logout button with a post request to the logout endpoint
//   const testLogout = async () => {
//     const res = await fetch("http://localhost:8000/logout", {
//       method: "POST",
//       credentials: "include",
//     });
//     console.log("logout status", res.status);
//   };

//   return (
//     <main className="p-6">
//       <button
//         onClick={testLogin}
//         className="bg-black text-white px-4 py-2 rounded"
//       >
//         Test login
//       </button>
//       <button
//         onClick={testDashboard}
//         className="bg-green-600 text-white px-4 py-2 rounded ml-4"
//       >
//         Test dashboard
//       </button>
//       <button
//         onClick={testMe}
//         className="bg-blue-600 text-white px-4 py-2 rounded ml-4"
//       >
//         Test me
//       </button>
//       <button
//         onClick={testLogout}
//         className="bg-red-600 text-white px-4 py-2 rounded ml-4"
//       >
//         Test logout
//       </button>
//     </main>
//   );
// }
import { getPokemons } from "@/lib/server";
import PokemonList from "@/components/PokemonList";

export default async function Page() {
  const data = await getPokemons(2);
  return <PokemonList initialData={data} />;
}

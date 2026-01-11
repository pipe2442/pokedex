import { NextResponse } from "next/server";

export async function fetchPokemons(page = 1) {
  const res = await fetch(`http://localhost:8000/pokemons?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch pokemons");
  return res.json();
}

export async function POST(req: Request) {
  const body = await req.text();

  const upstream = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });

  const res = new NextResponse(await upstream.text(), {
    status: upstream.status,
    headers: {
      "content-type":
        upstream.headers.get("content-type") ?? "application/json",
    },
  });

  // Forward Set-Cookie (si Rails setea cookie)
  const setCookies = (upstream.headers as any).getSetCookie?.() ?? [];
  for (const c of setCookies) res.headers.append("set-cookie", c);

  return res;
}

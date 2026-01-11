"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"

export default function LoginPage() {
  const setUser = useAuthStore(s => s.setUser)
  const router = useRouter()

  const [login, setLogin] = useState("admin")
  const [password, setPassword] = useState("admin")
  const [error, setError] = useState("")

  const submit = async () => {
    setError("")

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    })

    if (!res.ok) {
      setError("Invalid credentials")
      return
    }

    const data = await res.json()
    setUser(data.user)
    router.push("/")
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow rounded-xl p-6 w-full max-w-sm space-y-3">
        <h1 className="text-xl font-bold text-center">Login</h1>
        <input value={login} onChange={e => setLogin(e.target.value)} placeholder="Username" className="border p-2 w-full" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="border p-2 w-full" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button onClick={submit} className="bg-black text-white w-full py-2 rounded">Login</button>
      </div>
    </main>
  )
}

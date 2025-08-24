'use client'

import React, { useState } from "react";
import { useRouter } from 'next/navigation'


export default function LoginPage() {
    const [password, setPassword] = useState<string>("")
    const [username , setUsername] = useState<string>("")
    const router = useRouter()
    // const handleLogin = async (e:React.FormEvent) =>{
    //     e.preventDefault();
    //     if (username === 'admin' && password === '1234') {
    //       document.cookie = `token=123456`
    //       router.push('/dashboard')
    //     } 
    // }
     const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ กันไม่ให้ form reload หน้า

    if (username === "admin" && password === "1234") {
      // ❌ document.cookie ใช้ไม่ได้กับ cookies() ฝั่ง server
      // ✅ เรียก API ให้ server เซ็ต cookie แทน
      const res = await fetch("/login/api/api-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        alert("Invalid credentials");
      }
    } else {
      alert("Invalid credentials");
    }
  };



    return (
         <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            value={username}
             onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
    )
}
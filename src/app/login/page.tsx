'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation'


export default function LoginPage() {
    const router = useRouter()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [error , setError] = useState('')
    const [email , setEmail] = useState('')

    const handleLogin = async (e:React.FormEvent) =>{
        e.preventDefault();

        if (username === 'admin' && password === '1234') {
            router.push('/dashboard')
        } else {
            setError('ชื่อผู้ให้หรือรหัสผ่านไม่ถูกต้อง')
        }
    }

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
            type="email"
            className="w-full px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
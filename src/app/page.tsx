"use client";
import { useState, useEffect } from 'react';

type User = {
  id: number;
  sku: string;
  name: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);


  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const res = await fetch('/api/users');
  //       if (!res.ok) {
  //         throw new Error('Failed to fetch users');
  //       }
  //       const data = await res.json();
  //       setUsers(data);
  //     } catch (err) {
  //       //setError(err.message);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  // const addUser = async () => {
  //   const res = await fetch('/api/users', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name, email }),
  //   });
  //   const newUser = await res.json();
  //   setUsers((prev) => [...prev, newUser]);
  // };

  // return (
  //   <div>
  //     <h1>User List</h1>
  //     <ul>
  //       {users.map((user) => (
  //         <li key={user.id}>
  //           {user.sku} ({user.name})
  //         </li>
  //       ))}
  //     </ul>
  //     <h2>Add User</h2>
  //     <input
  //       type="text"
  //       placeholder="sku"
  //       value={sku}
  //       onChange={(e) => setName(e.target.value)}
  //     />
  //     <input
  //       type="text"
  //       placeholder="name"
  //       value={name}
  //       onChange={(e) => setEmail(e.target.value)}
  //     />
  //     <button onClick={addUser}>Add</button>
  //   </div>
  // );
  return <div className="text-black">Dashboard</div>;
};








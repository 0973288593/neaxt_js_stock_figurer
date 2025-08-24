"use client";
import { useState, useEffect } from 'react';
import login from "module";
import Login from "../app/login/page"
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';

type User = {
  id: number;
  sku: string;
  name: string;
};

export default function Home() {

  // return <div className="text-black">Dashboard</div>;
   redirect('/login');

  //return null
};








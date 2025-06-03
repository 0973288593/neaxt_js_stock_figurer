"use client";
import React from "react";
import {
  LucideIcon,
  LayoutDashboard,
  BadgeDollarSign,
  CircleUserRound,
  Settings,
  WalletCards,
} from "lucide-react";

import { SidebarItems } from "@/types";
import SidebarItem from "./item";

interface ISidebarItem {
  name: string;
  path: string;
  icon: LucideIcon;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const items: ISidebarItem[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Product",
    path: "/products",
    icon: BadgeDollarSign,
  },
  {
    name: "Payment",
    path: "/payment",
    icon: WalletCards,
  },
  {
    name: "Accounts",
    path: "/accounts",
    icon: CircleUserRound,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
    items: [
      {
        name: "General",
        path: "/settings",
      },
      {
        name: "Security",
        path: "/settings/security",
      },
      {
        name: "Notifications",
        path: "/settings/notifications",
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-10 p-4">
      <div className="flex flex-col spece-y-10 w-full">
        <div className="flex" style={{ alignItems: "center" }}>
          <img
            style={{ width: "50px" }}
            className="h-100 w-fil rounded-full"
            src="/images/logo.png"
          />
          <h3 className="text-black ml-3" style={{ width: "100%" }}>
            Model
          </h3>
        </div>
        <div className="flex flex-col space-y-2 mt-2">
          {items.map((item, index) => (
            <SidebarItem key={index} item={item} />
          ))}
        </div>
      </div>
      Sidebar
    </div>
  );
};
export default Sidebar;

"use client";
import React, { useState } from "react";
import {
  LucideIcon,
  LayoutDashboard,
  BadgeDollarSign,
  CircleUserRound,
  Settings,
  WalletCards,
  HandCoins
} from "lucide-react";


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

const returnSidbar = () => {

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
    name: "Deposit",
    path: "/deposit",
    icon: HandCoins,
  },
      {
    name: "Order",
    path: "/order",
    icon: HandCoins,
      items: [
        {
        name: "Order List",
        path: "/order/orderList",
      },
      {
        name: "Order Create",
        path: "/order/orderCreate",
      },
  
    ],
  },
  {
    name: "PaymentPlan",
    path: "/PaymentPlan",
    icon: Settings,
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
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [ripple, setRipple] = useState<boolean>(false);
  const handIeLogoClick = (): void => {
    setRipple(true);
    setTimeout(() => {
      setRipple(false);
      setIsOpen((prev) => !prev);
    }, 400)

  }


  return (
    <div className={`fixed top-0 left-0 h-screen  transition-all duration-300 ${isOpen ? "w-64 p-4  bg-white shadow-lg z-10 " : "w-16 p-2"}`}>
      {/* <div className="flex flex-col spece-y-10 w-full"> */}
      <div className="flex flex-col space-y-10 w-fill">

        <div className="flex" style={{ alignItems: "center" }}>
          <img
            style={{ width: "50px" }}
            className="h-100 w-fil rounded-full"
            src="/images/logo.png"
            onClick={handIeLogoClick}
          />
          {ripple && (
            <span className="absolute w-12 h-12 rounded-full aninmate-rapple border-2 border-blue-400"></span>
          )}

          {isOpen && (
            <h3 className="text-black ml-3">
              Model
            </h3>)}

        </div>
        {isOpen && (
          <div className="flex flex-col space-y-2 mt-2">
            {items.map((item, index) => (
              <SidebarItem key={index} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Sidebar;


import Sidebar from "@/components/sidebar"
import "../app/globals.css"
import { cookies } from "next/headers";
export default async  function  DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  const cookiesStore = await cookies() // ✅ ต้อง await
  const token = cookiesStore.get("token")?.value
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div className="flex h-screen w-full bg-gray-100">
          {token && <Sidebar />}
           <div className={`flex flex-col w-full h-full ${token ? "ml-64" : ""} p-4`}>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
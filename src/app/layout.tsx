import Sidebar from "@/components/sidebar"
import "../app/globals.css"



export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div className="flex h-screen w-full bg-gray-100">
          <Sidebar />
          <div className="flex flex-col w-full h-full ml-64 p-4">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
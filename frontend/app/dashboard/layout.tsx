import Sidebar from "./components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-cols-6">
      <div className="bg-gray-100 min-h-screen px-6 py-8 ">
        <Sidebar />
      </div>
      <div className="py-8 px-2 col-span-5">
        <div className="max-w-6xl mx-auto">{children}</div>
      </div>
    </div>
  );
}

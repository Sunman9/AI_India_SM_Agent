import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-black-900 text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header />
        <main className="p-8 pb-12 flex-1 overflow-auto bg-black-900">
          {children}
        </main>
      </div>
    </div>
  );
}

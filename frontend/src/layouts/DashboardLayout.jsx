import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div
      className="min-h-screen flex"
      style={{
        background: "var(--bg-page)",
      }}
    >
      <Sidebar />

      <main
        className="flex-1 overflow-y-auto"
        style={{
          background: "var(--bg-page)",
        }}
      >
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
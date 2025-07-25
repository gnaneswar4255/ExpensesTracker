// src/components/SidebarLayout.jsx
import { Link } from "react-router-dom";

const SidebarLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 shadow-2xl flex flex-col justify-between rounded-r-[40px]">
        <div>
          {/* Logo / Branding */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-indigo-600 tracking-tight">
              Expense Tracker
            </h1>
            <p className="text-sm text-gray-400 mt-1">Manage your expenses smartly</p>
          </div>
          </div>
        {/* Logout */}
        <div className="pt-6 border-t mt-6">
          <Link
            to="/login"
            className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
          >
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 bg-gradient-to-br from-white to-slate-100 overflow-y-auto rounded-l-[40px] shadow-inner">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;

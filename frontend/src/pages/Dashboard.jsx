// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import SidebarLayout from "../components/SidebarLayout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  const token = localStorage.getItem("token");

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

  useEffect(() => {
    fetch("http://localhost:5000/api/expenses", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error:", err));

    fetch("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.name);
      })
      .catch((err) => console.error("Profile fetch error:", err));
  }, [token]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const newExpense = { title, amount, category };

    const res = await fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newExpense),
    });

    if (res.ok) {
      const data = await res.json();
      setExpenses([data, ...expenses]);
      setTitle("");
      setAmount("");
      setCategory("");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    const res = await fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setExpenses(expenses.filter((e) => e._id !== id));
  };

  const filtered = selectedMonth
    ? expenses.filter((e) => new Date(e.date).toISOString().slice(0, 7) === selectedMonth)
    : expenses;

  const chartData = Object.entries(
    filtered.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const exportCSV = () => {
    const csv = [
      ["Title", "Amount", "Category", "Date"],
      ...filtered.map((e) => [e.title, e.amount, e.category, new Date(e.date).toLocaleDateString()]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "expenses.csv";
    a.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Expense Report", 14, 16);
    doc.autoTable({
      head: [["Title", "Amount", "Category", "Date"]],
      body: filtered.map((e) => [e.title, e.amount, e.category, new Date(e.date).toLocaleDateString()]),
    });
    doc.save("expenses.pdf");
  };

  return (
    <SidebarLayout>
      <form onSubmit={handleAdd} className="bg-white border p-6 rounded-[40px] shadow-xl space-y-4 mb-10">
        <h3 className="text-2xl font-semibold text-gray-700">Add New Expense</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required className="p-3 border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Amount" required className="p-3 border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required className="p-3 border border-gray-300 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition duration-300">Add Expense</button>
      </form>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="p-2 border rounded-full shadow" />
        <div className="flex gap-2">
          <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300">Export CSV</button>
          <button onClick={exportPDF} className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300">Export PDF</button>
        </div>
      </div>

      <div className="space-y-6">
        {loading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500">No expenses found.</p>
        ) : (
          filtered.map((exp) => (
            <div key={exp._id} className="bg-white p-6 rounded-[40px] shadow-md border border-gray-100 transition hover:shadow-lg">
              <div>
                <p className="font-semibold text-xl text-gray-800">{exp.title}</p>
                <p className="text-base text-gray-600">
                  ₹{exp.amount} — <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{exp.category}</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">{new Date(exp.date).toLocaleDateString()}</p>
              </div>
              <button onClick={() => handleDelete(exp._id)} className="text-red-500 text-sm mt-2 hover:underline">
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {filtered.length > 0 && (
        <>
          <div className="mt-16 bg-white p-8 rounded-[40px] shadow-xl border">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Category-wise Pie Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-12 bg-white p-8 rounded-[40px] shadow-xl border">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Category-wise Bar Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </SidebarLayout>
  );
};

export default Dashboard;

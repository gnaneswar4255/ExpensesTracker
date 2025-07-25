// ✅ Final Signup.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.name);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err); // 🔍 Log for debugging
      const message = err.response?.data?.message || err.message || "Signup failed";
      setError(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-[30px] shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">Create Your Account</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-2xl font-semibold hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 font-semibold hover:underline">
            Log In
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;

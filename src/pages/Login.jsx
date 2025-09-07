import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      navigate("/products");
    } catch (err) {
      console.error(err);
      setError("Oops! Wrong email or password 🌸");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-rose-100 via-teal-100 to-blue-100">
      <div className="bg-white/80 backdrop-blur-lg border border-teal-200 shadow-xl rounded-3xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-teal-600 text-center mb-4">
          Welcome Back 🏡
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Log in and make your space beautiful ✨
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 border rounded-2xl focus:ring-2 focus:ring-teal-400 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@homedecor.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border rounded-2xl focus:ring-2 focus:ring-teal-400 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-teal-500 text-white rounded-2xl font-semibold hover:bg-teal-600 transition shadow-md"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          New here?{" "}
          <a
            href="/signup"
            className="text-coral-500 font-medium hover:underline"
          >
            Create an account 🎉
          </a>
        </p>
      </div>
    </div>
  );
}

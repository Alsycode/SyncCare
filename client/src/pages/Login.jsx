import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated,isAuthenticated } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("response", response.data);
      if (response.data.success) {
        setIsAuthenticated(true); // Set authentication state
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  // Watch for changes in isAuthenticated and navigate
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Navigate to home page after authentication
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex h-screen w-full">
      {/* Left half: image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80')",
        }}
      ></div>

      {/* Right half: login form */}
      <div className="w-1/2 flex flex-col justify-center items-center px-10">
        <h2 className="text-3xl font-semibold mb-8">Admin Login</h2>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded shadow"
        >
          {error && (
            <div className="mb-4 text-red-600 font-semibold">{error}</div>
          )}

          <label className="block mb-2 font-medium text-black" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mb-5 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
          />

          <label className="block mb-2 font-medium text-black" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-6 px-4 py-2 border border-gray-300 text-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
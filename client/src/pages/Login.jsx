import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import toast from "react-hot-toast";
import { UserContext } from "../context/user.context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    axios
      .post(
        "/api/user/signin",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        localStorage.setItem("token", res.data?.token);
        setUser(res.data);
        toast.success("Logged in successfully!");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "An error occurred!";
        toast.error(errorMessage);
        console.log(error.response.data);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-white text-3xl mb-5 font-semibold uppercase">
        Collabistan
      </h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

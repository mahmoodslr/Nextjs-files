"use client";
import Container from "@/components/Container";
import { useState } from "react";
import Cookie from "js-cookie";
import { redirect } from "next/navigation";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const response = {
      token: "asasdasdfasdfgasdfgh",
      expires: 7,
    };
    Cookie.set("token", response.token, { expires: response.expires });
    redirect("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Container>
        <div className="border border-gray-300 p-6 flex flex-col w-96 mx-auto bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-center mb-4 text-gray-700">
            Login
          </h2>
          <input
            onChange={(e) => setUserName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            type="text"
            placeholder="username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="mt-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            type="password"
            placeholder="password"
          />
          <button
            onClick={handleLogin}
            className="mt-4 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-all"
          >
            Submit
          </button>
        </div>
      </Container>
    </div>
  );
}

export default Login;

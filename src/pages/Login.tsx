import { useState } from "react";
import LoginImg from "../assets/hero_healthcare.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Implement your authentication logic here
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <div className="flex justify-center">
          {/* Icon at the top of the page */}
          <div className="rounded-full p-2 mb-4">
            <img src={LoginImg} alt="Icon" />
          </div>
        </div>
        <div className="flex justify-center mb-6">
          {/* Illustration */}
          <h2 className="text-2xl font-bold">Login</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="you@example.com"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-center mt-6">
            <Button type="submit">Log In</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

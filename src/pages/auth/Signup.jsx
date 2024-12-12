import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// Assuming you have a signup action in your redux slice

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });

      if (!response.ok) {
        throw new Error("Signup failed. Please check your details.");
      }

      const data = await response.json();

      alert("Signup successful!");
    } catch (error) {
      console.error("Error during signup:", error.message);
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-ivory justify-center">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-md rounded-lg px-8 py-10 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-black">Create Your Account</h2>
        <p className="text-sm text-sageGreen-dark">Enter your details to create a new account</p>

        <div className="my-4">
          <label
            className="block text-sageGreen-dark text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="my-4">
          <label
            className="block text-sageGreen-dark text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-sageGreen-dark text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-sageGreen-dark text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-dustyRose-light"
            placeholder="Confirm your password"
            required
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center text-sageGreen-dark text-sm">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            Remember Me
          </label>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="flex items-center justify-center bg-white text-sageGreen-dark border-2 border-sageGreen-dark py-2 px-4 rounded font-bold hover:bg-sageGreen-light hover:text-white transition w-1/2 mr-2"
          >
           Google Sign Up 
          </button>
          <button
            type="submit"
            className="w-1/2 bg-dustyRose-dark border-2 border-dustyRose-dark hover:bg-dustyRose text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-dustyRose-light transition"
          >
            Sign Up
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-dustyRose-dark hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

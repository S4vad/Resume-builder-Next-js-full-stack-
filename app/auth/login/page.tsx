"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false, // Handle redirect manually
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else if (result?.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error("Google sign in error:", error);
      setError("Google sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center mx-auto p-6 sm:p-0">
      <div className="flex w-full max-w-md flex-col gap-4 border border-blue-600 p-8 rounded-xl">
        <p className="text-center text-gray-500">Login to your account</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="email"
            placeholder="Enter email"
            value={formData.email}
            type="email"
            required
            disabled={isLoading}
            className="border border-gray-300 rounded px-4 py-3 text-lg focus:outline-none focus:border-blue-400 disabled:opacity-50"
          />

          <div className="relative w-full">
            <input
              onChange={handleChange}
              name="password"
              placeholder="Enter password"
              value={formData.password}
              type={showPassword ? "text" : "password"}
              required
              disabled={isLoading}
              className="border w-full border-gray-300 rounded px-5 py-3 text-lg focus:outline-none focus:border-blue-400 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>

          <button
            className="w-full px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded text-white text-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center">
          Don&apos;t have an account?
          <Link href="/auth/signup" className="underline text-red-400 ml-2 cursor-pointer">
            Sign up
          </Link>
        </p>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="px-5 py-3 bg-slate-100 rounded text-xl flex items-center justify-center gap-4 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <BsGoogle /> Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;

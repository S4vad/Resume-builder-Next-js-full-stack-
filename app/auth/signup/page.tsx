"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [formData, setFormData] = useState({ 
    name: "",
    email: "", 
    password: "" 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        const signInResult = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (signInResult?.error) {
          setError("Account created but login failed. Please try logging in manually.");
        } else if (signInResult?.ok) {
          router.push("/dashboard");
        }
      } else {
        setError(data.error || "Signup failed. User may already exist.");
      }
    } catch (error) {
      setError("An error occurred during signup");
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error("Google sign up error:", error);
      setError("Google sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center p-6">
      <div className="flex w-full max-w-md flex-col gap-4 border border-green-600 p-8 rounded-xl">
        <p className="text-center text-gray-500">Create your account</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={handleChange}
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            type="text"
            required
            disabled={isLoading}
            className="border border-gray-300 rounded px-4 py-3 text-lg focus:outline-none focus:border-blue-400 disabled:opacity-50"
          />

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
              value={formData.password}
              placeholder="Enter password"
              type={showPassword ? "text" : "password"}
              required
              disabled={isLoading}
              minLength={6}
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
            type="submit"
            disabled={isLoading}
            className="w-full px-5 py-3 bg-black rounded text-white text-xl hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center">
          Already have an account?
          <Link href="/auth/login" className="underline text-red-400 ml-2">
            Login
          </Link>
        </p>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          onClick={handleGoogleSignUp}
          disabled={isLoading}
          className="w-full px-5 py-3 flex items-center gap-3 justify-center rounded text-black bg-slate-100 text-xl hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <BsGoogle />
          Sign up with Google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
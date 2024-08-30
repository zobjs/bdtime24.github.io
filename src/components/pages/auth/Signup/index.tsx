"use client";
import React, { useState } from "react";
import { Button, notification } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AuthSignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter(); // Initialize the router for navigation

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign-up data ->", formData);

    // Here you would typically send the data to your API for processing

    // Success case logic here
    notification.success({
      message: "Sign-up Successful",
      description: "Your account has been created!",
    });

    // Redirect to the login page or dashboard after successful sign-up
    router.push("/auth/signin"); // Change "/auth/signin" to your desired route
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-6">Sign Up</h2>
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            User Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mt-4">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </Button>
        </div>
      </form>

      <div className="text-center">
        <p className="text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-bold text-blue-500 hover:text-blue-800"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthSignUp;

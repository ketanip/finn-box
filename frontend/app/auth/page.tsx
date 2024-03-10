"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const AuthPage = () => {

  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // const message = api.auth.login(email, password);
      const message = "Logged in successfully.";
      toast(message);
      router.push("/dashboard");
    } else {
      // const message = api.auth.signup(name, email, password);
      const message = "Signed up successfully, please login.";
      toast(message);
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      {/* Header */}
      <h2 className="text-2xl text-center my-4 font-bold">Authenticate</h2>

      {/* Login sign-up toggle. */}
      <div className="px-4 py-2 bg-gray-100 rounded mb-5">
        <div
          className={`  grid grid-cols-2 text-center gap-4 items-center cursor-pointer`}
        >
          <span
            className={isLogin ? "bg-white px-2 py-1 rounded shadow" : ""}
            onClick={(e) => setIsLogin(!isLogin)}
          >
            Login
          </span>
          <span
            className={!isLogin ? "bg-white px-2 py-1 rounded shadow" : ""}
            onClick={(e) => setIsLogin(!isLogin)}
          >
            Sign Up
          </span>
        </div>
      </div>

      {/* Main form */}
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        {!isLogin && (
          <div className="flex flex-col gap-1">
            <span>Name</span>
            <input
              type="text"
              name="name"
              id="name"
              className="input input-bordered w-full "
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <span>Email</span>
          <input
            type="email"
            name="email"
            id="email"
            className="input input-bordered w-full "
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <span>Password</span>
          <input
            type="password"
            name="password"
            id="password"
            className="input input-bordered w-full "
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-neutral">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;

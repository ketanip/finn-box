"use client";
import { auth } from "@/api";
import { jwt_utils } from "@/utils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const AuthPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const resp = await auth.signIn({ email, password });
        jwt_utils.setJWTToken(resp.data.token);
        jwt_utils.setUser(resp.data.user);
        toast(resp.message);
        router.push("/dashboard");
      } catch (err: any) {
        toast(err.message);
      }
    } else {
      try {
        const resp = await auth.signUp({ name, email, password });
        toast(resp.message);
      } catch (err: any) {
        toast(err.message);
      }
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

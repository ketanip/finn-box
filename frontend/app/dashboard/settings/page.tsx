"use client";
import { auth } from "@/api";
import { jwt_utils } from "@/utils";
import { getUser } from "@/utils/jwt";
import router from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { FcSettings } from "react-icons/fc";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string | undefined>();

  useEffect(() => {
    const user = getUser();
    setName(user.name);
    setEmail(user.email);
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const resp = await auth.updateUser({ name, email, password });
      console.log(resp)
      jwt_utils.setJWTToken(resp.data.token);
      jwt_utils.setUser(resp.data.user);
      toast(resp.message);
    } catch (err: any) {
      toast(err.message);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <FcSettings />
          <span>Settings</span>
        </h2>
      </div>

      <div className="max-w-xl ">
        {/* Main form */}
        <form className="flex flex-col gap-4 my-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-1">
            <span>Name</span>
            <input
              type="text"
              name="name"
              id="name"
              className="input input-bordered w-full "
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span>Email</span>
            <input
              type="email"
              name="email"
              id="email"
              className="input input-bordered w-full "
              onChange={(e) => setEmail(e.target.value)}
              defaultValue={email}
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
            />
          </div>
          <button type="submit" className="btn btn-neutral">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;

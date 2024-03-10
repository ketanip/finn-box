"use client";
import router from "next/router";
import React, { FormEvent, useState } from "react";
import { FcSettings } from "react-icons/fc";
import { toast } from "react-toastify";

const SettingsPage = () => {
  const [name, setName] = useState("Jhon Doe");
  const [email, setEmail] = useState("jhondoe@example.com");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    
    e.preventDefault();
    
    // user = useUser();
    // const data: any = {name,email}
    // if (password) data.password= password;
    // api.user.update(user.id, data);

    const message = "Profile updated successfully.";
    toast(message);
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

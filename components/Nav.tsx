"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import logo from "../public/logo.png";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import defaultImage from "../public/defaultImage.png";

const Navbar = () => {
  const { data: session, status } = useSession();
  return (
    <div className="  mx-auto h-[80px] bg-gradient-to-r from-white to-slate-50 flex  items-center justify-between p-8 shadow-xs  ">
      <div>
        <Image
          src={logo}
          alt="logo"
          width={80}
          height={80}
          className="size-20"
        />
      </div>
      {status === "loading" && <ClipLoader color="#6a39c9" />}
      {status === "authenticated" && (
        <div className="flex flex-col items-end">
          {session?.user?.name && (
            <div className=" text-violet-600">{session.user.name}</div>
          )}
          <div className="flex items-center gap-2">
            <Image
              src={session.user?.image || defaultImage}
              alt="user image"
              width={40}
              height={40}
              className="rounded-full"
            />
            <button
              className="bg-red-200 py-1 px-2 text-orange-600 rounded hover:cursor-pointer hover:bg-red-300 hover:text-white"
              onClick={async () => await signOut()}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

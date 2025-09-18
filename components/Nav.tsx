"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import defaultImage from "../public/defaultImage.png";
import { FileText } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  if (pathname.startsWith("/auth")) {
    return null;
  }

  const handleLogoClick = () => {
    if (session && pathname !== "/") {
      router.push("/dashboard");
    }
  };
  return (
    <div className="  mx-auto h-[80px] bg-gradient-to-r from-white to-slate-50 flex  items-center justify-between p-8 shadow-xs  ">
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={handleLogoClick}
      >
        <div className="md:size-10 size-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <FileText className="size-6 text-white" />
        </div>
        <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          ElevateCV
        </span>
      </div>
      {status === "authenticated" && (
        <div className="flex flex-col items-end">
          {session?.user?.name && (
            <div className=" text-violet-600 text-sm sm:text-md ">{session.user.name}</div>
          )}
          <div className="flex items-center gap-2  ">
            <Image
              src={session.user?.image || defaultImage}
              alt="user image"
              width={40}
              height={40}
              className="rounded-full size-8 sm:size-10 "
            />
            <button
              className="bg-slate-100 shadow-sm py-1 px-2 text-sm md:text-md  text-orange-600 rounded hover:cursor-pointer hover:bg-red-300 hover:text-white"
              onClick={async () => await signOut()}
            >
              Logout
            </button>
          </div>
        </div>
      )}
      {status === "unauthenticated" && (
        <div className="flex items-center space-x-4">
          <button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            onClick={() => router.push("/auth/login")}
          >
            Get Started
          </button>
        </div>
      )}
      {(status === "loading" && pathname !== "/") && (
        <div>
          <ClipLoader size={28} color="blue" />
        </div>
      )}
    </div>
  );
};

export default Navbar;

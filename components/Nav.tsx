"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Navbar = () => {f
  const { data: session, status } = useSession();
  return (
    <div className="w-full h-[65px] bg-slate-200 ">
      {status === "loading" && <div>fetching user info</div>}
      {status === "authenticated" && (
        <div>
          {session && <div className="">{session.user!.name}</div>}
          <button onClick={async () => await signOut()}>Logout</button>{" "}
        </div>
      )}
    </div>
  );
};

export default Navbar;

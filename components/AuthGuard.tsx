"use client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return; 

  
    if (pathname === "/" && session) {
      router.push("/dashboard");
      return;
    }

    // If on protected route and not authenticated, redirect to home
    const protectedRoutes = ["/dashboard", "/resume"];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    
    if (isProtectedRoute && !session) {
      router.push("/");
      return;
    }
  }, [session, status, pathname, router]);


  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color="#3b82f6" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
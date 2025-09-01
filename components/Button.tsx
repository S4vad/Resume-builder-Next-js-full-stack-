import React from "react";
import { cn } from "@/lib/utils"; //  helper for merging classes

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...props }:ButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-fuchsia-600 hover:to-orange-500 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

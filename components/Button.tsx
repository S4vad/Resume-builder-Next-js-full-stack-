import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-1 rounded-lg text-white font-medium transition-colors",
        "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-fuchsia-600 hover:to-orange-500",
        "px-3 py-1.5 text-sm",
        "sm:px-4 sm:py-2 sm:text-base",
        "md:px-6 md:py-3 md:text-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

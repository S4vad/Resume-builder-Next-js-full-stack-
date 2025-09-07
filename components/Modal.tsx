import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  header: string;
  className?: string;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  header,
  className,
  ...props
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={cn(
          "bg-gray-100 rounded-2xl p-8 w-[90%] max-w-md shadow-lg relative  ",
          className
        )}
        {...props}
      >
        <h1 className="text-xl font-semibold text-gray-800">{header}</h1>
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-600  cursor-pointer hover:text-pink-400"
        >
          <IoCloseOutline size={27} />
        </button>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

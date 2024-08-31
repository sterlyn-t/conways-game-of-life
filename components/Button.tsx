import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  onClick: () => void;
  iconButton?: boolean;
  children: React.ReactNode;
}

const Button = ({ onClick, iconButton, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "transition flex ease-in items-center justify-center rounded-full h-8 shadow-md bg-gray-700 hover:bg-gray-800",
        iconButton ? "w-8" : "px-4"
      )}
    >
      {children}
    </button>
  );
};

export default Button;

import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="transition flex ease-in items-center justify-center h-8 px-4 rounded-full shadow-md bg-gray-700 hover:bg-gray-800"
    >
      {children}
    </button>
  );
};

export default Button;

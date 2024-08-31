import React from "react";

interface SelectProps {
  value: number;
  children: React.ReactNode;
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
}

const Select = ({ value, children, onChange, label }: SelectProps) => {
  return (
    <label className="cursor-pointer group transition flex items-center justify-center ease-in bg-gray-700 h-8 hover:bg-gray-800 rounded px-2 shadow-md disabled:opacity-50">
      <select
        value={value}
        aria-label={label}
        onChange={onChange}
        className="bg-gray-700 cursor-pointer group-hover:bg-gray-800 ease-in transition"
      >
        {children}
      </select>
    </label>
  );
};

export default Select;

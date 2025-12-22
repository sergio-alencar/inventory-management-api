// src/components/FormField.tsx

import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  error?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  error,
  placeholder,
  onChange,
  className = "",
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-bold text-slate-700"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`$ w-full rounded border p-2 outline-none transition-all ${
          error
            ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200"
            : "border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        }`}
      />
      {error && (
        <span className="mt-1 block text-xs font-bold text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormField;

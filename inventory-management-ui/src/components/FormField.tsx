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

export const FormField: React.FC<FormFieldProps> = ({
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
      <label htmlFor={name} className="mb-1 block text-sm font-bold">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded border p-2 outline-none transition-all dark:bg-slate-700 ${
          error
            ? "border-red-primary focus:ring-1 focus:ring-red-400"
            : "focus:border-blue-dark border-gray-dark focus:ring-1 focus:ring-indigo-200 dark:focus:border-slate-50"
        }`}
      />
      <p
        className="text-red-primary min-h-[20px] pt-1 text-xs font-bold transition-all"
        aria-live="polite"
      >
        {error ? error : " "}
      </p>
    </div>
  );
};

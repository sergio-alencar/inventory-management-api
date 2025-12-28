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
  min?: number;
  max?: number;
  step?: string | number;
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
  min,
  max,
  step,
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
        min={min}
        max={max}
        step={step}
        className={`w-full rounded border p-2 outline-none transition-all dark:bg-slate-700 ${
          error
            ? "border-red-primary focus:ring-1 focus:ring-red-400"
            : "border-gray-dark focus:border-blue-dark focus:ring-1 focus:ring-indigo-200 dark:focus:border-slate-50"
        }`}
      />
      <p
        className="min-h-[20px] pt-1 text-xs font-bold text-red-primary transition-all"
        aria-live="polite"
      >
        {error ? error : " "}
      </p>
    </div>
  );
};

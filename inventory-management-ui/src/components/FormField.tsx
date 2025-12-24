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
        className="text-card-dark dark:text-card-light mb-1 block text-sm font-bold"
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
        className={`w-full rounded border p-2 outline-none transition-all dark:bg-slate-600 ${
          error
            ? "0 border-error-primary focus:ring-2 focus:ring-red-200"
            : "dark:border-card-dark focus:border-brand-primary border-slate-300 focus:ring-2 focus:ring-indigo-200"
        }`}
      />
      {error && (
        <span className="text-error-primary mt-1 block text-xs font-bold">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormField;

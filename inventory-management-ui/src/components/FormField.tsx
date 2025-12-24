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
        className="mb-1 block text-sm font-bold text-card-dark dark:text-card-light"
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
            ? "border-error-primary focus:ring-2 focus:ring-red-200"
            : "border-slate-300 focus:border-brand-primary focus:ring-2 focus:ring-indigo-200 dark:border-card-dark"
        }`}
      />
      <p
        className="min-h-[20px] text-xs font-bold text-error-primary transition-all"
        aria-live="polite"
      >
        {error ? error : " "}
      </p>
    </div>
  );
};

export default FormField;

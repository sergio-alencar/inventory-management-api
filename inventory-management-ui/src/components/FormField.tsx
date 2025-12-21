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
  prefix?: string;
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
  prefix,
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-bold text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-5 -translate-y-1/2 font-bold text-gray-500">
            {prefix}
          </span>
        )}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded border p-2 outline-none transition-all ${prefix ? "pl-10" : "pl-2"} ${
          error
            ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200"
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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

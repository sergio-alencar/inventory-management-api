import React from "react";
import type { FormFieldProps } from "@/types/components/shared";

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
      <label htmlFor={name} className="mb-1 block text-sm">
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
        className="retro-input w-full"
      />
      <p
        className="min-h-[20px] pt-1 text-xs text-win98-error"
        aria-live="polite"
      >
        {error ? error : " "}
      </p>
    </div>
  );
};

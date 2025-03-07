import { Input } from "antd";
import React, { useState } from "react";
import MVText from "../Text";

interface MVInputProps {
  name: string; // Tên field
  label: string; // Nhãn cho input
  type?: string; // Loại input (text, email, password, etc.)
  value?: string; // Giá trị mặc định
  onChange?: (name: string, value: string) => void; // Hàm callback khi thay đổi giá trị
  rules?: {
    required?: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    customMessage?: string;
  }; // Định nghĩa validate
  placeholder?: string;
}

const MVInput: React.FC<MVInputProps> = ({
  name,
  label,
  type = "text",
  value = "",
  onChange,
  rules = {},
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState<string | null>(null);

  const handleValidate = (value: string) => {
    if (rules.required && !value.trim()) {
      setError("This field is required.");
      return false;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      setError(rules.customMessage || "Invalid format.");
      return false;
    }

    if (rules.minLength && value.length < rules.minLength) {
      setError(`Must be at least ${rules.minLength} characters.`);
      return false;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      setError(`Must not exceed ${rules.maxLength} characters.`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);

    // Validate khi thay đổi
    handleValidate(value);

    // Gọi callback nếu có
    onChange?.(name, value);
  };

  const handleBlur = () => {
    // Validate khi blur (focus ra ngoài)
    handleValidate(inputValue);
  };

  return (
    <div className="mb-3">
      <MVText htmlFor={name}>{label}</MVText>
      <Input
        id={name}
        type={type}
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder || label}
        status={error ? "error" : ""}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1 block">
          {error}
        </span>
      )}
    </div>
  );
};

export default MVInput;

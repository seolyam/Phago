// src/components/ui/Button.tsx

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

import React, { forwardRef } from "react";
import InputProps from "@/types/Input";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon, ...rest }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          autoComplete="off"
          className={`${className} w-full px-4 py-2 border-2 rounded-lg`}
          {...rest}
        />
        <span className="absolute top-2 left-3">{icon}</span>
        {error && <small className="ml-2 text-red-500">{error}</small>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

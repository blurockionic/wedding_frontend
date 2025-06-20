import React from "react";

export const Input = React.forwardRef(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={`px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-rose-500 transition ${className}`}
    {...props}
  />
));

Input.displayName = "Input"; 
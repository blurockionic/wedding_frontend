import React from "react";

export const Button = React.forwardRef(({ className = "", children, ...props }, ref) => (
  <button
    ref={ref}
    className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 transition ${className}`}
    {...props}
  >
    {children}
  </button>
));

Button.displayName = "Button"; 
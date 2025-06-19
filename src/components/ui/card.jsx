import React from "react";

export const Card = ({ className = "", children, ...props }) => (
  <div className={`bg-white rounded-lg shadow ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`px-4 py-2 border-b ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent = ({ className = "", children, ...props }) => (
  <div className={`px-4 py-2 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className = "", children, ...props }) => (
  <div className={`px-4 py-2 border-t ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className = "", children, ...props }) => (
  <h2 className={`text-lg font-semibold ${className}`} {...props}>
    {children}
  </h2>
); 
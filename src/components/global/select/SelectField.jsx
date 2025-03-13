import React from "react";

export const SelectField = ({ id, label, value, options, register, error, placeholder }) => (
  <div className="my-4 cursor-pointer">
    <label htmlFor={id} className="block font-montserrat text-gray-700 font-medium ">
      {label}
    </label>
    <div className="relative">
      <select
      style={{
        color: 'inherit', 
        fontWeight: 'normal', // Default font weight
        ':hover': {
          backgroundColor: 'red',
          fontWeight: 'bold',
        },

        
      }}

      value={value}
        id={id}
        {...register(id)}
        className="w-full p-2 border rounded bg-background text-popover-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        placeholder={placeholder}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option
          
          className="defaultcss" key={index} value={option.value}>
            {option.label}
          </option> 
        ))}
      </select>
      {error && <span className="text-error text-xs mt-1">{error.message}</span>}
    </div>
  </div>
);

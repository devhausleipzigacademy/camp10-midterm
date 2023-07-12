import React, { cloneElement } from 'react';

type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends NativeInputProps {
  icon?: JSX.Element;
}

export function Input({ icon, placeholder, id, ...props }: InputProps) {
  return (
    <label
      htmlFor={id}
      className="flex items-center bg-dark-light px-5 py-3 gap-5 rounded-md outline-none focus-within:outline-white-dimmed focus-within:outline-offset-0"
    >
      {icon && cloneElement(icon, { className: 'w-6 h-6 text-white-dimmed' })}
      <input
        id={id}
        name={id}
        placeholder={placeholder}
        className="bg-dark-light text-white w-full text-m font-500 flex-1 placeholder-white-dimmed outline-none"
        {...props}
      />
    </label>
  );
}

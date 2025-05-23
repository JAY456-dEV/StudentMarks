import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, id, fullWidth = true, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label 
            htmlFor={inputId} 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
            placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500
            text-gray-900 sm:text-sm transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
            ${fullWidth ? 'w-full' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 transition-opacity duration-200">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
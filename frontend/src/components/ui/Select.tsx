import React, { SelectHTMLAttributes, forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  fullWidth?: boolean;
  onChange: (value: string) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className = '', 
    label, 
    error, 
    options, 
    id, 
    value, 
    onChange, 
    fullWidth = true,
    placeholder,
    ...props 
  }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label 
            htmlFor={selectId} 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          value={value}
          onChange={handleChange}
          className={`
            block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm 
            placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500
            text-gray-900 sm:text-sm transition-all duration-200
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
            ${fullWidth ? 'w-full' : ''}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-600 transition-opacity duration-200">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
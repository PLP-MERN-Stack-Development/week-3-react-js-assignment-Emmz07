import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  children, 
  className = '', 
  disabled,
  onClick,
  ...props 
}) => {
  let buttonClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Add variant styles
  if (variant === 'primary') {
    buttonClasses += ' bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600';
  } else if (variant === 'secondary') {
    buttonClasses += ' bg-slate-200 hover:bg-slate-300 text-slate-800 focus:ring-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200';
  } else if (variant === 'danger') {
    buttonClasses += ' bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600';
  } else if (variant === 'ghost') {
    buttonClasses += ' bg-transparent hover:bg-slate-100 text-slate-600 focus:ring-slate-500 dark:hover:bg-slate-800 dark:text-slate-400';
  }

  // Add size styles
  if (size === 'sm') {
    buttonClasses += ' px-3 py-1.5 text-sm';
  } else if (size === 'md') {
    buttonClasses += ' px-4 py-2 text-sm';
  } else if (size === 'lg') {
    buttonClasses += ' px-6 py-3 text-base';
  }

  buttonClasses += ' ' + className;

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};
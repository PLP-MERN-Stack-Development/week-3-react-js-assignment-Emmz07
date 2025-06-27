import React from 'react';

export const Card = ({ children, className = '', variant = 'default' }) => {
  let cardClasses = 'rounded-xl transition-all duration-200';
  
  if (variant === 'default') {
    cardClasses += ' bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700';
  } else if (variant === 'elevated') {
    cardClasses += ' bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700';
  } else if (variant === 'outlined') {
    cardClasses += ' bg-transparent border-2 border-slate-300 dark:border-slate-600';
  }

  cardClasses += ' ' + className;

  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-b border-slate-200 dark:border-slate-700 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-t border-slate-200 dark:border-slate-700 ${className}`}>
      {children}
    </div>
  );
};
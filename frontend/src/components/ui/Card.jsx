import React from 'react';
import { clsx } from 'clsx';

export const Card = ({
  children,
  className,
  padding = 'md',
  hover = false,
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-lg border border-gray-100',
        paddingClasses[padding],
        hover && 'hover:shadow-xl transition-shadow duration-200',
        className
      )}
    >
      {children}
    </div>
  );
};
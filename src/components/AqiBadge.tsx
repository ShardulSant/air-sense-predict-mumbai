
import React from 'react';
import { cn } from '@/lib/utils';
import { AqiCategory } from '@/types/airQuality';
import { getAqiClassName } from '@/utils/aqiUtils';

interface AqiBadgeProps {
  category: AqiCategory;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AqiBadge: React.FC<AqiBadgeProps> = ({ 
  category, 
  size = 'md',
  className 
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1'
  };

  return (
    <span 
      className={cn(
        'aqi-badge',
        getAqiClassName(category),
        sizeClasses[size],
        className
      )}
    >
      {category}
    </span>
  );
};

export default AqiBadge;

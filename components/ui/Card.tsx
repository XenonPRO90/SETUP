import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => {
  const hoverClass = hover ? 'transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(212,175,55,0.2)]' : '';
  
  return (
    <div className={'glass-card p-8 ' + hoverClass + ' ' + className}>
      {children}
    </div>
  );
};

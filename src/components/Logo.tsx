import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = 'h-12 w-auto' }) => {
  return (
    <img 
      src="/logo.png" 
      alt="LogicWorks.AI Logo"
      className={className}
    />
  );
};

export default Logo;
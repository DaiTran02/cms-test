import React from 'react';

const ButtonDelete = ({ className }: { className?: string }) => {
  return (
    <div className={`${className}`}>
      <img
        className="w-5 h-5 block mx-auto"
        src="/images/icons/delete.svg"
        alt="icon delete"
      />
    </div>
  );
};

export default ButtonDelete;

import type { PropsGlobal } from '@/interface/propsGlobal';
import React, { type ReactNode } from 'react';

const GridWrapper = ({ children, className }: PropsGlobal) => {
  return (
    <div
      className={`grid grid-cols-12 gap-5 max-xl:flex max-xl:flex-col ${className} `}
    >
      {children}
    </div>
  );
};

export default GridWrapper;

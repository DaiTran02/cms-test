import type { PropsGlobal } from '@/interface/propsGlobal';
import React from 'react';

const GridFourCol = ({ children }: PropsGlobal) => {
  return (
    <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-xs-max:flex max-xs-max:flex-col">
      <>{children}</>
    </div>
  );
};

export default GridFourCol;

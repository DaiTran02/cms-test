import React, { useState } from 'react';

const ViewMoreButton = ({
  dataLayout,
  handleViewMore,
  skip,
}: {
  dataLayout: any;
  handleViewMore: (value?: number) => void;
  skip?: number;
}) => {
  return (
    <div
      onClick={() => {
        handleViewMore();
      }}
      className="flex justify-between items-center"
    >
      <hr className="block flex-1 text-grey" />
      <p className="block cursor-pointer p-3 w-fit whitespace-nowrap max-w-[130px] font-bold text-grey-bold ">
        Xem thêm
      </p>
      <hr className="block flex-1 text-grey" />
    </div>
  );
};

export default React.memo(ViewMoreButton);

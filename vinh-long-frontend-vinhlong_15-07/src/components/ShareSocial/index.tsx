import React from 'react';

const ShareSocial = ({ className }: { className: string }) => {
  return (
    <div
      className={`${className} flex item-center justify-between 
                  bg-grey-footer py-[6px] px-3 rounded-[3px]`}
    >
      <div className="flex item-center gap-3">
        <button
          className="py-2 w-[70px] px-3 py-1
      bg-red-hover h-fit whitespace-nowrap text-[14px]
       rounded-[4px] text-white"
        >
          Chia sẻ
        </button>
        <div className="flex">
          <img
            className="block w-6 "
            src="/images/icons/zalo-red.svg"
            alt="zalo"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <img
          className="block w-[20px]"
          src="/images/icons/link.svg"
          alt="zalo"
        />
        <img
          className="block w-[20px]"
          src="/images/icons/zalo-black.svg"
          alt="zalo"
        />

        <img
          className="block w-[20px]"
          src="/images/icons/mail.svg"
          alt="zalo"
        />
      </div>
    </div>
  );
};

export default ShareSocial;

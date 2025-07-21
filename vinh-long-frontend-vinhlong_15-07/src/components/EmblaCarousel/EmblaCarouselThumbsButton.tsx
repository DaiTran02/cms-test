import Image from 'next/image';
import React from 'react';

type PropType = {
  selected: boolean;
  index: number;
  imageSrc: string;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, imageSrc, index, onClick } = props;

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
      <div
        onClick={onClick}
        // type="button"
        className="embla-thumbs__slide__number"
      >
        {process.env.NEXT_PUBLIC_IMAGE_NEXTJS === 'true' ? (
          <Image
            width={295}
            height={166}
            src={imageSrc}
            className="w-full h-full object-cover"
            alt="asd"
          />
        ) : (
          <img
            width={295}
            height={166}
            src={imageSrc}
            className="w-full h-full object-cover"
            alt="asd"
          />
        )}
        {/* {index + 1} */}
      </div>
    </div>
  );
};

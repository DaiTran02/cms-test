import React from 'react';

const ButtonNextSlide = ({
  count,
  current,
  className = 'mt-5 justify-end w-[60%]',
  nextSlide,
}: {
  count: number;
  current: number;
  className?: string;
  nextSlide: (index: number) => void;
}) => {
  return (
    <div className={`flex ${className}`}>
      <div style={{ display: 'flex', gap: 8 }}>
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="dot-carousel cursor-pointer"
            onClick={() => {
              nextSlide(index); // ✅ dùng đúng index
            }}
            style={{
              width: current === index ? 30 : 12, // ✅ index === current
              height: 12,
              borderRadius: 9999,
              backgroundColor: current === index ? '#7c7070' : '#d8cccc', // ✅ match lại
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ButtonNextSlide);

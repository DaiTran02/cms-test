import type { Article } from '@/interface/propsGlobal';
import { useState, type ReactNode } from 'react';
import ModelPopupVideo from '../ModelPopupVideo';
const IconTypeArticle = ({
  type,
  className,
  styleImg = 'w-5 h-4 inline-block ',
  post,
}: {
  type?: string;
  className?: ReactNode;
  styleImg?: string;
  post?: Article;
}) => {
  return (
    <>
      <div className={`${className}`}>
        {type == 'Audio' && (
          <div className={`${styleImg}`}>
            <img
              src="/images/icons/audio.svg"
              className={`${styleImg}`}
              alt="nongthonviet"
            />
          </div>
        )}
        {(type == 'Phóng sự ảnh' || type == 'PhongSuAnh') && (
          <div className={`${styleImg}`}>
            <img
              src="/images/icons/image.svg"
              className={`${styleImg}`}
              alt="nongthonviet"
            />
          </div>
        )}
        {type == 'Video' && (
          <div className={`${styleImg}`}>
            <img
              src="/images/icons/play.svg"
              className={`${styleImg}`}
              alt="nongthonviet"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default IconTypeArticle;

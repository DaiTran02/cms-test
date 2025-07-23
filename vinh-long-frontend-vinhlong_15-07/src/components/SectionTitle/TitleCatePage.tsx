import Link from 'next/link';
import React from 'react';

const TitleCatePage = ({
  className,
  title,
}: {
  className?: string;
  title: string;
}) => {
  return (
    <Link href="/" className={`block text-center ${className} w-full mx-auto`}>
      <h1 className="mb-3 title-main uppercase max-w-[700px] mx-auto">
        {title}
      </h1>
      <hr className="block  w-full h-1 bg-red-hover text-red-hover" />
    </Link>
  );
};

export default TitleCatePage;

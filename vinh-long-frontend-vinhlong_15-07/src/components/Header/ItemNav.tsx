import type { Category } from '@/interface/category';
import { getLinkToCatePage } from '@/utils/utilitiesHandling';
import Link from 'next/link';
import React, { type ReactNode } from 'react';

const ItemNav = ({
  dataNav,
  children,
}: {
  dataNav: Category;
  children?: ReactNode;
}) => {
  return (
    <li>
      {dataNav?.clickAble ? (
        <Link
          href={(dataNav?.alias && getLinkToCatePage(dataNav?.alias)) || ''}
          className="heading-3 uppercase block py-1 max-md:py-3"
          rel="noopener noreferrer"
        >
          <span className="w-1 h-4 mr-1 bg-red-primary inline-block"></span>
          {dataNav?.name}
        </Link>
      ) : (
        <h3
          className="heading-3 uppercase block py-1 max-md:py-3"
          rel="noopener noreferrer"
        >
          <span className="w-1 h-4 mr-1 bg-red-primary inline-block"></span>
          {dataNav?.name}
        </h3>
      )}
      {children}
    </li>
  );
};

export default ItemNav;

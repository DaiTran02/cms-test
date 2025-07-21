// 'use client';

import type { Category } from '@/interface/category';
import { getLinkToCatePage } from '@/utils/utilitiesHandling';
import Link from 'next/link';

export function NavigationMenuDemo({
  dataCategory,
  className,
}: {
  dataCategory: Category[];
  className?: string;
}) {
  if (!dataCategory) return null;
  const cateDisplayOnMenu = dataCategory?.filter(
    (item) => item?.isDisplayOnMenu === true
  );
  return (
    <ul
      className={`nav_wrapper heading-3
         uppercase relative ${className}`}
    >
      {cateDisplayOnMenu &&
        Array.isArray(cateDisplayOnMenu) &&
        cateDisplayOnMenu.map((item, index) => {
          const subCateDisplay = item?.subCates?.filter(
            (item) => item?.isDisplayOnMenu === true
          );
          return (
            <li
              key={item?.id || index}
              className="nav_wrapper-item px-[10px] whitespace-nowrap h-full relative"
            >
              <Link
                href={
                  item?.url ||
                  (item?.alias && getLinkToCatePage(item?.alias)) ||
                  ''
                }
              >
                <h3 className="py-2 inline-block">
                  {item?.label || item?.name}
                </h3>
                {index !== cateDisplayOnMenu?.length - 1 && item?.url && (
                  <span className="inline-block w-[2px] ml-4 h-4 bg-black">
                    {' '}
                  </span>
                )}
              </Link>

              <ul className="nav_level-sub-block body-3 text-black font-normal z-[999] bg-white absolute">
                {item?.subCates &&
                  item?.subCates.length > 0 &&
                  subCateDisplay?.map((subCateItem, subIndex) => {
                    const subCateDisplaylv2 = subCateItem?.subCates?.filter(
                      (sub) => sub?.isDisplayOnMenu === true
                    );
                    return (
                      <li
                        key={subCateItem?.id || subIndex}
                        className="nav_sub-level-2 sub-li relative"
                      >
                        <Link
                          href={
                            (subCateItem?.alias &&
                              getLinkToCatePage(subCateItem?.alias)) ||
                            ''
                          }
                        >
                          <h3>{subCateItem?.name}</h3>
                        </Link>

                        {subCateDisplaylv2 && (
                          <ul className="nav_sub-level-3 bg-gradient-to-b w-full min-w-[120px] top-0 absolute -right-[100%]">
                            {subCateDisplaylv2?.map((subLv3, indexLv3) => {
                              return (
                                <li
                                  key={subLv3?.id || indexLv3}
                                  className="nav_level-item sub-li w-fit bg-white"
                                >
                                  <Link
                                    href={
                                      (subLv3?.alias &&
                                        getLinkToCatePage(subLv3?.alias)) ||
                                      ''
                                    }
                                  >
                                    <h3>{subLv3?.name}</h3>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
              </ul>
            </li>
          );
        })}
    </ul>
  );
}

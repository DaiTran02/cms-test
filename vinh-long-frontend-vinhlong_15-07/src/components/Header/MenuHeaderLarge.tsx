import type { Category } from '@/interface/category';
import Link from 'next/link';
import Container from '../Container/Container';
import GridWrapper from '../LayoutGrid/GridWrapper';
import { getLinkToCatePage } from '@/utils/utilitiesHandling';
import styled from 'styled-components';
import { useState } from 'react';
export const Div = styled.div`
  .animation-scroll {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(-10px);
    transition: all 0.5s ease;
    height: 0;
    overflow: hidden;
    transition: all;
  }

  .animation-scroll.active {
    opacity: 1;
    height: initial;
    transition: all 0.5s ease;
    visibility: visible;
    pointer-events: auto;
    overflow: auto;
    transform: translateY(0);
  }
`;
const MenuHeaderLarge = ({ dataCategory }: { dataCategory: Category[] }) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const [subSelected, setSubSelected] = useState('');
  const cateDisplayOnMenu = dataCategory?.filter(
    (item) => item?.isDisplayOnMenu === true
  );
  return (
    <div className="bg-white -mx-2 relative z-[99]">
      <Container className="pb-[30px]">
        <div className="py-10 ">
          <h3 className="block pb-3 border-b border-black text-[32px] leading-[34px] uppercase font-bold">
            Tất cả danh mục
          </h3>
        </div>
        <GridWrapper
          className="max-h-[450px] max-md:max-h-[75vh] 
          no-scrollbar overflow-x-scroll overflow-y-none
        max-xl:flex max-xl:flex-col-reverse max-md:gap-0"
        >
          <div
            className="col-span-9 gap-7 grid grid-cols-12 no-scrollbar
         max-xl:overflow-scroll max-xl:flex max-xl:flex-wrap
         max-md:block"
          >
            {cateDisplayOnMenu &&
              cateDisplayOnMenu?.slice(0, 6).map((item, index) => {
                const subCateDisplay = item?.subCates?.filter(
                  (item) => item?.isDisplayOnMenu === true
                );
                return (
                  <ul className="col-span-4" key={index}>
                    <li>
                      {item?.clickAble ? (
                        <Link
                          href={
                            (item?.alias && getLinkToCatePage(item?.alias)) ||
                            ''
                          }
                          className="heading-3 uppercase block py-1 max-md:py-3"
                          rel="noopener noreferrer"
                        >
                          <span className="w-1 h-4 mr-1 bg-red-primary inline-block"></span>
                          {item?.name}
                        </Link>
                      ) : (
                        <h3
                          className="heading-3 uppercase block py-1 max-md:py-3"
                          rel="noopener noreferrer"
                        >
                          <span className="w-1 h-4 mr-1 bg-red-primary inline-block"></span>
                          {item?.name}
                        </h3>
                      )}
                    </li>
                    {subCateDisplay &&
                      subCateDisplay?.map((sub, index) => {
                        const subCateLv3Display = sub?.subCates?.filter(
                          (item) => item?.isDisplayOnMenu === true
                        );
                        return (
                          <Div key={index}>
                            <li className="flex justify-between">
                              {sub?.clickAble ? (
                                <Link
                                  className="body-2 uppercase py-1 max-md:py-2 inline-block"
                                  href={
                                    (sub?.alias &&
                                      getLinkToCatePage(sub?.alias)) ||
                                    ''
                                  }
                                >
                                  {sub?.name}
                                </Link>
                              ) : (
                                <h3
                                  onClick={() => {
                                    if (sub?.id) setSubSelected(sub?.id);
                                    if (sub?.id === subSelected) {
                                      setOpenSubmenu(!openSubmenu);
                                    } else {
                                      setOpenSubmenu(true);
                                    }
                                  }}
                                  className={`body-2 uppercase py-1 max-md:py-2 inline-block ${
                                    sub?.subCates &&
                                    sub?.subCates?.length > 0 &&
                                    'cursor-pointer'
                                  } `}
                                >
                                  {sub?.name}
                                </h3>
                              )}

                              {sub?.subCates && sub?.subCates?.length > 0 && (
                                <div
                                  className="inline-block px-3 cursor-pointer"
                                  onClick={() => {
                                    if (sub?.id) setSubSelected(sub?.id);
                                    if (sub?.id === subSelected) {
                                      setOpenSubmenu(!openSubmenu);
                                    } else {
                                      setOpenSubmenu(true);
                                    }
                                  }}
                                >
                                  <img
                                    className="!w-[12px] h-[6px] block mt-[10px]"
                                    src="/images/icons/select.png"
                                    alt=""
                                  />
                                </div>
                              )}
                            </li>
                            {subCateLv3Display &&
                              subCateLv3Display?.map((subLv3, index) => {
                                return (
                                  <ul
                                    key={index}
                                    className={`pl-3 animation-scroll  ${
                                      subLv3 &&
                                      subSelected == subLv3?.parentId &&
                                      openSubmenu == true
                                        ? 'active'
                                        : ''
                                    }`}
                                  >
                                    <Link
                                      className="body-2 uppercase block py-1 max-md:py-2"
                                      href={
                                        (subLv3?.alias &&
                                          getLinkToCatePage(subLv3?.alias)) ||
                                        ''
                                      }
                                    >
                                      {subLv3?.name}
                                    </Link>
                                  </ul>
                                );
                              })}
                          </Div>
                        );
                      })}
                  </ul>
                );
              })}
          </div>
          <div className="col-span-3 max-xl:flex max-xl:gap-3 max-md:block">
            {cateDisplayOnMenu &&
              cateDisplayOnMenu?.slice(6, 7).map((item, index) => {
                const subCateDisplay = item?.subCates?.filter(
                  (item) => item?.isDisplayOnMenu === true
                );
                return (
                  <ul
                    className="col-span-4
                    max-xl:flex max-xl:gap-5
                     max-md:flex-wrap 
                      max-md:mb-2 max-md:gap-3 mb-1"
                    key={index}
                  >
                    <li className="">
                      {item?.clickAble ? (
                        <Link
                          href={
                            (item?.alias && getLinkToCatePage(item?.alias)) ||
                            ''
                          }
                          className="heading-3 block w-fit uppercase border-b border-black pb-1 mb-1"
                          rel="noopener noreferrer"
                        >
                          <span className="w-1 h-4 mr-1 bg-red-primary inline-block"></span>
                          {item?.name}
                        </Link>
                      ) : (
                        <h3
                          className="heading-3 block w-fit uppercase border-b border-black pb-1 mb-1"
                          rel="noopener noreferrer"
                        >
                          {item?.name}
                        </h3>
                      )}
                    </li>
                    {subCateDisplay &&
                      subCateDisplay?.map((sub, index) => (
                        <li key={index}>
                          <Link
                            rel="noopener noreferrer"
                            className="heading-3 uppercase block w-fit border-b border-black pb-1 mb-1"
                            href={
                              (sub?.alias && getLinkToCatePage(sub?.alias)) ||
                              ''
                            }
                          >
                            {sub?.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                );
              })}
            <div className="mt-4">
              {cateDisplayOnMenu &&
                cateDisplayOnMenu
                  ?.slice(7, cateDisplayOnMenu?.length)
                  .map((item, index) => {
                    const subCateDisplay = item?.subCates?.filter(
                      (item) => item?.isDisplayOnMenu === true
                    );
                    return (
                      <ul className="col-span-4" key={index}>
                        <li>
                          <Link
                            href={
                              (item?.alias && getLinkToCatePage(item?.alias)) ||
                              ''
                            }
                            className="heading-3 uppercase block py-1 max-md:py-3"
                            rel="noopener noreferrer"
                          >
                            <span className="w-1 h-4 mr-1 bg-red-primary inline-block"></span>
                            {item?.name}
                          </Link>
                        </li>
                        {subCateDisplay &&
                          subCateDisplay?.map((sub, index) => {
                            const subCateLv3Display = sub?.subCates?.filter(
                              (item) => item?.isDisplayOnMenu === true
                            );
                            return (
                              <ul>
                                <li key={index}>
                                  <Link
                                    className="body-2 uppercase block py-1 max-md:py-2"
                                    href={
                                      (sub?.alias &&
                                        getLinkToCatePage(sub?.alias)) ||
                                      ''
                                    }
                                  >
                                    {sub?.name}
                                  </Link>
                                </li>
                                {subCateLv3Display &&
                                  subCateLv3Display?.map((subLv3, index) => {
                                    return (
                                      <li key={index} className="pl-3">
                                        <Link
                                          className="body-2 uppercase block py-1 max-md:py-2"
                                          href={
                                            (subLv3?.alias &&
                                              getLinkToCatePage(
                                                subLv3?.alias
                                              )) ||
                                            ''
                                          }
                                        >
                                          {subLv3?.name}
                                        </Link>
                                      </li>
                                    );
                                  })}
                              </ul>
                            );
                          })}
                      </ul>
                    );
                  })}
            </div>
          </div>
        </GridWrapper>
      </Container>
    </div>
  );
};

export default MenuHeaderLarge;

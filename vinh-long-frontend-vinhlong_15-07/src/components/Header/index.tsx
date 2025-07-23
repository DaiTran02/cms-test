import type { Category } from '@/interface/category';
import type { Article } from '@/interface/propsGlobal';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Urlbanner } from '../../../public/apiTemp/dataVinhLong/bannerMain';
import PopUpMenu from './PopUpMenu';
import styled from 'styled-components';
import { set } from 'date-fns';
export const Div = styled.div`
  .animation-scroll {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(-70px);
    transition: all 0.5s ease;
    height: 0;
    position: fixed;
    top: 0;
    overflow: hidden;
  }

  .animation-scroll.active {
    opacity: 1;
    height: initial;
    visibility: visible;
    pointer-events: auto;
    overflow: auto;
    transform: translateY(0);
  }
`;
const Header = ({
  dataCategory,
  dataBanner,
  dataHead,
  dataCatePopUp,
}: {
  dataCategory: Category[];
  dataBanner: Article;
  dataHead: Category[];
  dataCatePopUp: Category[];
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const [headerScroll, setHeaderScroll] = useState(false);
  const handleHeaderScroll = () => {
    if (window.scrollY >= 200) {
      setHeaderScroll(true);
    } else {
      setHeaderScroll(false);
    }
  };
  useEffect(() => {
    setOpen(false);
    window.addEventListener('scroll', handleHeaderScroll);
  }, [pathname]);
  const openPopUp = () => {
    setOpen(true);
  };

  return (
    <header className="mb-5">
      <div className="mb-5">
        <Link href="/" className="block">
          <img srcSet={`${Urlbanner} 2x`} alt="Logo vinh long" />
        </Link>
        <title>{process?.env.NEXT_PUBLIC_TITLE_MAIN}</title>
        <h1 className="sr-only">{process?.env.NEXT_PUBLIC_TITLE_MAIN}</h1>
      </div>
      <PopUpMenu
        popUpopen={setOpen}
        dataHead={dataHead}
        dataCateFull={dataCategory}
        isOpenPopUp={open}
      />
      <Div>
        <PopUpMenu
          popUpopen={setOpen}
          className={`animation-scroll ${headerScroll == true ? 'active' : ''}`}
          stateHeader={headerScroll}
          dataCateFull={dataCategory}
          dataHead={dataCatePopUp}
          isOpenPopUp={open}
        />
      </Div>
    </header>
  );
};

export default React.memo(Header);

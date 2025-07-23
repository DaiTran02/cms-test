import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import type { Category } from '@/interface/category';
import Link from 'next/link';
import { useState } from 'react';
import { Input } from '../ui/input';
import MenuHeaderLarge from './MenuHeaderLarge';
import { NavigationMenuDemo } from './NavigationMenuDemo';
const PopUpMenu = ({
  stateHeader: headerScroll,
  dataCateFull: dataCategory,
  className,
  dataHead,
  popUpopen,
  isOpenPopUp,
}: {
  dataHead: Category[];
  stateHeader?: boolean;
  dataCateFull: Category[];
  className?: string;
  popUpopen?: (value: boolean) => void | undefined;
  isOpenPopUp?: boolean;
}) => {
  const [keywordSearch, setKeywordSearch] = useState('');
  const onSubmit = () => {
    if (!!keywordSearch?.trim()) {
      const domain = process.env.NEXT_PUBLIC_SITE_URL?.replace('https://', '');
      const query = `site:${domain} "${keywordSearch.trim()}"`;
      const url = `https://www.google.com/search?q=${encodeURIComponent(
        query
      )}`;
      window.open(url, '_blank');
    }
  };
  return (
    <div
      className={`
        py-1 
          ${
            headerScroll
              ? 'fixed z-[30] max-md:px-5 transition-all duration-500 opacity-100 top-0 left-0 mx-auto h-[60px] max-md:h-10 w-full bg-white max-lg:bg-red-primary shadow-lg'
              : 'relative transition-all duration-500 bg-white'
          } ${className}`}
    >
      <div
        className={`flex items-center gap-3
            ${
              headerScroll
                ? 'max-w-[1240px] transition-all duration-500 mx-auto h-full border-transparent border-y-[1px] '
                : 'border-[#393939] border-y-[1px] transition-all duration-500 justify-between'
            }`}
      >
        {headerScroll && (
          <Link
            href="/"
            className="flex justify-center transition-all duration-500 w-[50px] h-[50px] max-md:w-8
          max-lg:transition-all max-lg:duration-500 max-lg:opacity-[1]"
          >
            <img
              className="block"
              src="/images/icons/logo_vl_circle.svg"
              alt="vinh long"
            />
          </Link>
        )}
        <div
          className={`flex items-center gap-3 ${
            headerScroll ? 'flex-row-reverse flex-1' : 'justify-between'
          }`}
        >
          <Dialog onOpenChange={popUpopen} open={isOpenPopUp}>
            <form>
              <DialogTitle></DialogTitle>
              <DialogTrigger asChild>
                <div className="w-9 h-9 p-[2px">
                  <img
                    className="cursor-pointer"
                    srcSet="/images/icons/menu.png 2x"
                    alt="menu icon"
                  />
                </div>
              </DialogTrigger>
              <DialogContent
                className="border-none sm:max-w-[1380px] 
               max-md:h-full max-md:p-0"
              >
                <MenuHeaderLarge dataCategory={dataCategory} />
              </DialogContent>
            </form>
          </Dialog>
          {dataHead && (
            <NavigationMenuDemo
              className={`${
                headerScroll ? 'flex-1 w-full justify-center !text-16' : ''
              } `}
              dataCategory={dataHead}
            />
          )}
        </div>
        {!headerScroll && (
          <div className="flex items-center gap-1">
            <Input
              placeholder="Tìm kiếm"
              onChange={(e) => {
                setKeywordSearch(e?.target?.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSubmit(); // Gọi hàm tìm kiếm khi Enter
                }
              }}
              className="block rounded-none focus-visible:--tw-ring-shadow-none
             border-none max-w-[300px]  outline-none  shadow-none"
            />
            |
            <button
              onClick={onSubmit}
              className="button-search cursor-pointer flex w-6 h-6"
            >
              <img
                className="w-full h-full object-cover"
                src="/images/icons/search.svg"
                alt=""
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopUpMenu;

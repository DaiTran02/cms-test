import type { PropsGlobal } from '@/interface/propsGlobal';
import { getLinkToCatePage, getPostDetailUrl } from '@/utils/utilitiesHandling';
import Link from 'next/link';

const SectionTitle = ({
  className,
  title,
  changeColor = false,
  cateAlias,
  lineUnderTitle = false,
  lineLeft = false,
}: PropsGlobal) => {
  return (
    <>
      {title && !lineUnderTitle && !lineLeft && (
        <div id="section__title" className={`flex gap-2 ${className}`}>
          <div className="w-7 border-b-[4px] border-red-primary"></div>

          <Link
            href={`${(cateAlias && getLinkToCatePage(cateAlias)) || ''}`}
            className="heading-3 title text-red-primary text-[22px] font-bold leading-[30px] uppercase "
          >
            <h3 className="heading-3 text-red-primary"> {title}</h3>
          </Link>
          <div className={`flex-grow border-b border-red-primary`}></div>
        </div>
      )}
      {lineUnderTitle && !lineLeft && (
        <Link
          href="/"
          className={`text-center gap-2 ${className} heading-3 justify-center text-red-primary
           text-[22px] block font-bold leading-[30px] uppercase w-full mx-auto`}
        >
          <h3 className="heading-3  pb-1 text-red-primary  ">{title}</h3>
          <hr className="block mx-auto w-[123px] h-[3px]  bg-red-primary" />
        </Link>
      )}
      {lineLeft && !lineUnderTitle && (
        <Link
          href="/"
          className={` ${className} heading-3 py-[10px] pl-2 flex  items-center border border-grey `}
        >
          <span className="block mr-2 w-[5px] h-[24px] bg-red-primary "></span>
          <h3 className="heading-3 block  text-black   ">{title}</h3>
        </Link>
      )}
    </>
  );
};

export default SectionTitle;

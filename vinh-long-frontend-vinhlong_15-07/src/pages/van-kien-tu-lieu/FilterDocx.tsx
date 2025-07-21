import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';
type FilterKey = string;

const FilterDocx = ({
  className,
  title,
  listFilter,
  type,
  handleOnClickFilter,
}: {
  className?: string;
  title?: string;
  listFilter?: string[];
  type: string;
  handleOnClickFilter: (value: string, type: string) => void;
}) => {
  return (
    <div className={`col-span-3 mb-3 ${className}`}>
      <div>
        <div
          className="bg-grey-bold text-white 
        heading-2 text-center uppercase
        max-xl:text-[16px] py-2  max-xl:text-start max-xl:px-3
        max-xl:bg-white max-xl:text-black
       "
        >
          <span className="inline-block opacity-0 w-1 h-4 mr-2 bg-red-primary max-xl:opacity-[1]"></span>
          {title}
        </div>
        <ul
          className="py-3 px-6 border border-grey-line max-xl:border-0 max-xl:hidden
        max-xl:pointer-events-none"
        >
          {listFilter?.map((item, index) => (
            <li
              key={item || index}
              value={item}
              onClick={() => handleOnClickFilter(item, type)}
              className="hover:underline heading-4 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="hidden pointer-events-none max-xl:block max-xl:pointer-events-auto">
        <Select onValueChange={(value) => handleOnClickFilter(value, type)}>
          <SelectTrigger className="w-full cursor-pointer border-0 shadow-2xs">
            <SelectValue placeholder="Chọn để xem" />
          </SelectTrigger>
          <SelectContent className="bg-white border-0">
            {listFilter?.map((item, index) => (
              <SelectItem key={item || index} value={item}>
                <li className="list-none cursor-pointer hover:text-red-primary">
                  {item}
                </li>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default React.memo(FilterDocx);

import AdsBanner from '@/components/AdBanners';
import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import SectionTitle from '@/components/SectionTitle';
import type { PropsGlobal } from '@/interface/propsGlobal';
import React from 'react';
import SlideTwoArticle from '../Home/SlideTwoArticle';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DataSelect } from '../../../../public/apiTemp/dataTempSelectHomeT';

const HomeT = ({ className, posts, dataLayout }: PropsGlobal) => {
  const handleChange = (value: string) => {
    if (value) {
      return window.open(value, '_blank');
    }
  };

  return (
    <div
      id={`${dataLayout?.sectionName}`}
      className={`${className}  overflow-hidden`}
    >
      <SectionTitle
        cateAlias={dataLayout?.cateAlias}
        title={dataLayout?.title}
        className="mb-4"
      />
      <GridWrapper>
        <SlideTwoArticle className="col-span-9" posts={posts} />
        <div className="col-span-3">
          <AdsBanner nameAds="HomeT_Side" />
          <div className="max-h-[132px] mt-4">
            <div className="bg-red-primary text-white heading-2 text-center py-4 uppercase">
              Liên kết
            </div>
            <div className="bg-grey-line py-4 px-2">
              <Select onValueChange={handleChange}>
                <SelectTrigger className="w-full cursor-pointer text-grey-bold heading-4 bg-white border-none outline-none rounded-[5px]">
                  <SelectValue
                    placeholder="Chọn liên kết"
                    className="py-2 px-4"
                  />
                </SelectTrigger>
                <SelectContent className="border-none text-black bg-white">
                  {DataSelect.map((opt) => (
                    <SelectItem
                      key={opt.alias}
                      value={opt.alias}
                      className="hover:bg-red-primary transition-[0.03s] hover:text-white"
                    >
                      <span className="cursor-pointer">{opt.name}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </GridWrapper>
    </div>
  );
};

export default React.memo(HomeT);

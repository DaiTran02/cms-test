// import {
//   AdvisoryAgencies,
//   ProvincialAgencies,
//   WardOrCommune,
// } from '@/constant/dataTempAcAgency';
import type { PropsGlobal } from '@/interface/propsGlobal';
import Link from 'next/link';
import {
  AdvisoryAgencies,
  ProvincialAgencies,
  WardOrCommune,
} from '../../../../public/apiTemp/dataTempScAgency';

const ScAgency = ({ className }: PropsGlobal) => {
  return (
    <div className={`${className}`}>
      <div
        id="ScAgency"
        className="flex justify-between gap-5 whitespace-nowrap
      max-xl:flex-wrap max-xl:justify-evenly border-[2px] rounded-[10px]
       border-grey py-9 px-[45px] max-md:flex-col"
      >
        <ItemSCAgency
          title="CÁC CƠ QUAN THAM MƯU"
          dataSingle={AdvisoryAgencies}
          className="max-w-[20%] w-full mr-1"
          titleStyle="text-start"
        />
        <ItemSCAgency
          title="ĐẢNG ỦY CÁC CƠ QUAN ĐẢNG TỈNH"
          dataSingle={ProvincialAgencies}
          className="max-w-[25%] w-full mr-1"
          titleStyle="text-start"
        />
        <div className="w-full">
          <ItemSCAgency
            title="XÃ / PHƯỜNG"
            isLink={false}
            styleSpanItem="max-w-[165px] whitespace-break-spaces"
            listData={WardOrCommune}
            styleListSpan="flex gap-3 w-full
            justify-between max-xl:gap-3 max-xl:flex-wrap 
            max-h-[200px] overflow-y-scroll overflow-x-hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default ScAgency;
const ItemSCAgency = ({
  className,
  styleListSpan,
  listData,
  styleSpanItem,
  dataSingle,
  title,
  titleStyle,
  isLink = true,
}: {
  styleListSpan?: string;
  styleSpanItem?: string;
  className?: string;
  title?: string;
  dataSingle?: { alias: string; name: string }[];
  listData?: { WardOrCommuneCol: { alias: string; name: string }[] }[];
  titleStyle?: string;
  isLink?: boolean;
}) => {
  return (
    <div className={`${className}`}>
      <div className={`w-full text-center mb-5 ${titleStyle}`}>
        <h5 className="heading-3 text-16 text-grey-bold">{title}</h5>
      </div>
      <div className={styleListSpan}>
        {listData &&
          listData?.map((item, index) => (
            <div key={index} className={`${index}`}>
              {item?.WardOrCommuneCol?.length &&
                item?.WardOrCommuneCol.map((itemArr, indexArr) => (
                  <div key={indexArr}>
                    {isLink ? (
                      <Link
                        key={itemArr?.alias || indexArr}
                        href={itemArr?.alias}
                        target="_blank"
                        className={`flex gap-2 items-center ${styleSpanItem} max:md:w-full`}
                      >
                        <span className="block shrink-0 w-2 h-3 bg-red-primary"></span>
                        <span className="block">{itemArr?.name}</span>
                      </Link>
                    ) : (
                      <>
                        <div
                          key={itemArr?.alias || indexArr}
                          className={`flex gap-2 items-center ${styleSpanItem} max:md:w-full`}
                        >
                          <span className="block shrink-0 w-2 h-3 bg-red-primary"></span>
                          <span className="block">{itemArr?.name}</span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
          ))}
        <div>
          {!listData &&
            dataSingle?.length &&
            dataSingle?.map((item) => (
              <Link
                key={item?.alias}
                href={item?.alias}
                target="_blank"
                className={`flex gap-2 items-center ${styleSpanItem} max:md:w-full`}
              >
                <span className="block shrink-0 w-2 h-3 bg-red-primary"></span>
                <span className="block">{item?.name}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

import SectionTitle from '../SectionTitle';

const dataTemp = [
  {
    id: 'lich-su-dang',
    title: 'Lịch sử Đảng',
  },
  {
    id: 'dang-ky',
    title: 'Đảng kỳ',
  },
  {
    id: 'dieu-le-dang',
    title: 'Điều lệ Đảng',
  },
  {
    id: 'sach-chinh-tri',
    title: 'Sách chính trị',
  },
  {
    id: 'van-kien-dang-toan-tap',
    title: 'Văn kiện Đảng toàn tập',
  },
  {
    id: 'gioi-thieu-van-kien',
    title: 'Giới thiệu văn kiện',
  },
  {
    id: 'van-kien-dai-hoi-dang',
    title: 'Văn kiện Đại hội Đảng',
  },
  {
    id: 'hoi-nghi-bch-trung-uong',
    title: 'Hội nghị BCH Trung ương',
  },
];
const ListDocxSide = ({
  title,
  dataDocx = dataTemp,
  className,
}: {
  title?: string;
  className?: string;
  dataDocx: any;
}) => {
  return (
    <div className={` ${className}`}>
      <SectionTitle
        title="CÁC CƠ QUAN THAM MƯU
"
        lineLeft={true}
      />
      <div className="border-x-[1px] border-b-[1px] flex flex-wrap  border-grey pl-5 pb-[14px]">
        {dataTemp.length > 0 &&
          dataTemp?.map((item: any) => (
            <div
              key={item?.title}
              className="whitespace-nowrap pt-[7px] pr-8 mb-1 "
            >
              <img
                className="inline-block mr-2"
                src="images/icons/located.png"
                alt=""
              />
              <span className="inline-block body-1 cursor-pointer">
                {item?.title}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListDocxSide;

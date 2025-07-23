import { getTimePeriod } from '@/utils/Format';
import { formatYYMMDD } from '@/utils/utilitiesHandling';

const DetailSchedule = ({
  dataDetail,
  dateCurrent,
}: {
  dataDetail: any;
  dateCurrent: Date;
}) => {
  const date = dateCurrent && formatYYMMDD(dateCurrent);
  const detail = date && dataDetail?.[date];

  if (!detail) {
    return <div>Chưa có lịch làm việc cho ngày: {date}</div>;
  }
  return (
    <div>
      <div>
        <div className=" flex border-collapse text-center border border-[#d3d3d3]">
          <div className="w-1/2 heading-4 border-r border-[#d3d3d3] p-2">
            Nội dung:
          </div>
          <div className="w-1/2 heading-4 p-2">
            Thành phần Thường trực Tỉnh ủy tham dự:
          </div>
        </div>
        <div className="">
          {detail &&
            detail?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="border flex border-collapse border-[#d3d3d3]"
                >
                  <div
                    className="w-1/2 border-r p-4 border-[#d3d3d3]"
                    // dangerouslySetInnerHTML={{ __html: item?.content }}
                  >
                    <p>
                      {item?.start && (
                        <span className="font-bold">
                          * {getTimePeriod(item?.start)}:{' '}
                        </span>
                      )}
                      <i>
                        {item?.start
                          ?.slice(0, 5)
                          ?.replace(':', ' giờ ')
                          ?.replace(' 00', '')}
                      </i>{' '}
                      <p>{item?.content}</p>
                    </p>
                  </div>
                  <div
                    className="w-1/2 col-span-6 p-2"
                    dangerouslySetInnerHTML={{ __html: item?.attendees }}
                  ></div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DetailSchedule;

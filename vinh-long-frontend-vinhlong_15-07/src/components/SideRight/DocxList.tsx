import type { DocxType, PropsGlobal } from '@/interface/propsGlobal';
import { formatArticleDate } from '@/utils/Format';
import React, { useState } from 'react';
import SectionTitle from '../SectionTitle';
import PopUpDocx from '../PopUpDocx';
import { useFetchAttachmentsDocx } from '@/hooks/useDocx';

const DocxList = ({
  className,
  posts,
  hasDate,
  title,
  hasBorder = false,
  titleCenter = false,
  hasImg = true,
  hasTitle,
}: {
  className?: string;
  posts?: DocxType[];
  hasDate?: boolean;
  title?: string;
  hasTitle?: boolean;
  hasBorder?: boolean;
  titleCenter?: boolean;
  hasImg?: boolean;
}) => {
  const [dataPopUp, setDataPopUp] = useState({});
  const [idSelected, setIdSelected] = useState('');
  const [openPopUp, setOpenPopUp] = useState(false);
  const { data: file } = useFetchAttachmentsDocx(idSelected, openPopUp);
  return (
    <div className={`${className} ${hasBorder && 'border py-3 px-5'}`}>
      {openPopUp && dataPopUp && (
        <PopUpDocx
          setOpenPopUp={setOpenPopUp}
          docx={{ ...dataPopUp, filePDF: file || '' }}
        />
      )}
      {!titleCenter && <SectionTitle className="mb-5" title={title || ''} />}
      {titleCenter && (
        <SectionTitle lineUnderTitle={true} className="" title={title} />
      )}
      <div>
        {posts?.map((post, index) => (
          <div
            onClick={() => {
              setOpenPopUp(true);
              setDataPopUp(post);
              if (post?.id) {
                setIdSelected(post?.id);
              }
            }}
            className={` ${
              index != posts?.length - 1
                ? 'border-b-[0.75px] py-3'
                : 'border-none  pt-3'
            } border-[#393939]`}
            key={post.id}
          >
            <h4 className="cursor-pointer font-medium line-clamp-2 heading-4">
              {post?.summary}
            </h4>
            {hasDate && (
              <div className={'flex gap-2 items-center mt-2 whitespace-nowrap'}>
                {hasDate && (
                  <div className="body-mini ">{post?.documentCode}</div>
                )}
                {hasDate && (
                  <div className="">
                    <img src="images/icons/schedule.png" alt="icon-schedule" />
                  </div>
                )}
                {hasDate && (
                  <div className="body-mini">
                    {post?.effectiveDate &&
                      formatArticleDate(post?.effectiveDate)}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocxList;

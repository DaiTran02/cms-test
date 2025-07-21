import Container from '@/components/Container/Container';
import { Table, TableCell, TableRow } from '@/components/ui/table';
import type { DocxType } from '@/interface/propsGlobal';
import { formatArticleDate } from '@/utils/Format';
import Image from 'next/image';
import Link from 'next/link';
import { type Dispatch, type SetStateAction } from 'react';
import { HEADER_TABLE_DOCX } from '../../../public/apiTemp/headerTableDocx';

const PopUpDocx = ({
  docx,
  setOpenPopUp,
}: {
  docx: DocxType;
  setOpenPopUp: Dispatch<SetStateAction<boolean>>;
}) => {
  const fileURL = docx?.filePDF && docx?.filePDF[0]?.split('_');
  return (
    <div
      className="fixed overflow-hidden
       top-0 left-0 w-full h-screen z-50"
    >
      <div
        onClick={() => setOpenPopUp(false)}
        className="bg-grey-bold opacity-[0.5] overflow-hidden
                    absolute top-0 left-0 w-full h-screen  z-90 "
      ></div>
      <Container
        className="absolute max-w-[70%] mx-auto top-1/2 left-1/2
                  translate-[-50%] 
                  h-fit max-h-[700px] 
                  overflow-y-scroll bg-grey-hover
                  z-90 flex justify-between no-scrollbar
                  max-xl:max-w-[80%] 
                  w-full
                  max-lg:max-w-full
                  "
      >
        <div className="p-5 w-full max-lg:p-1">
          <h1 className="heading-3 py-2">Chi tiết văn bản</h1>
          <Table className=" p-8 border border-grey-bold ">
            <TableCell
              className={`heading-4 font-normal border-grey-hover p-0`}
            >
              {HEADER_TABLE_DOCX &&
                HEADER_TABLE_DOCX?.map((item, index: number) => {
                  return (
                    <TableRow
                      key={index}
                      className={`${
                        index % 2 == 0 && 'bg-grey-footer'
                      } border-r border-grey`}
                    >
                      <TableCell
                        className={`heading-3 border-r border-grey-bold 
                        ${index % 2 == 0 && 'bg-red'}`}
                      >
                        {item?.title}
                      </TableCell>
                      <TableCell className="heading-3 w-full font-normal border-grey-hover p-2 whitespace-normal">
                        {item?.key === 'effectiveDate' && docx?.[item?.key]
                          ? docx?.effectiveDate &&
                            formatArticleDate(docx?.effectiveDate)
                          : docx?.[item?.key] ?? ''}
                      </TableCell>
                    </TableRow>
                  );
                })}
              <TableRow className={`border-r border-grey `}>
                <TableCell className={`heading-3 border-r border-grey-bold `}>
                  Tệp đính kèm
                </TableCell>
                <TableCell className="heading-3 font-normal border-grey-hover p-2 whitespace-normal">
                  <Link
                    href={(docx?.filePDF && docx?.filePDF[0]) || ''}
                    className="flex p-1 items-center gap-1"
                    target="_blank"
                  >
                    <p className="block underline">
                      {fileURL && fileURL[fileURL?.length - 1]}
                    </p>
                    <Image
                      className="max-w-5"
                      width={20}
                      height={34}
                      src="/images/icons/down.png"
                      alt="docx.png"
                    />
                  </Link>
                </TableCell>
              </TableRow>
            </TableCell>
          </Table>
        </div>

        <div
          onClick={() => setOpenPopUp(false)}
          className="absolute max-w-[30px] top-0 right-0 text-[20px] pt-2 pr-2 "
        >
          <Image
            width={30}
            height={30}
            src="/images/icons/close.svg"
            alt="close"
          />
        </div>
      </Container>
    </div>
  );
};

export default PopUpDocx;

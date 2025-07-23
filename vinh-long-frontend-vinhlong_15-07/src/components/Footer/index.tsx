import { useFetchToolView } from '@/hooks/useToolView';
import type { PropsGlobal } from '@/interface/propsGlobal';
import React from 'react';
import Container from '../Container/Container';
import WidgetItem from '../WidgetItem';
import Link from 'next/link';
import { getLinkToCatePage } from '@/utils/utilitiesHandling';
import type { Category } from '@/interface/category';

const Footer = ({ dataCategory }: { dataCategory: Category[] }) => {
  const data = dataCategory;
  const { data: dataTool } = useFetchToolView();
  return (
    <footer className="bg-grey-footer py-10 mt-7">
      <Container>
        <ul className="flex justify-center items-center bg-black max-lg:flex-wrap py-1">
          {Array.isArray(data) &&
            data?.map((item, index) => {
              return (
                <li key={item?.id}>
                  <Link
                    className="heading-4 uppercase text-white"
                    href={`${
                      item?.url
                        ? item?.url
                        : item?.alias && getLinkToCatePage(item?.alias)
                    }`}
                  >
                    {item?.label || item?.name}
                    {index !== data?.length - 1 && (
                      <span className="h-3 mx-4 w-[1px] bg-white inline-block"></span>
                    )}
                  </Link>
                </li>
              );
            })}
        </ul>
        <hr className="mt-2 h-[2px] text-white" />
        <div className="text-center mt-9">
          <WidgetItem widgetName="Footer_Head" />
          <div className="mb-3 body-2 ">
            <p>
              Lượt xem: <span id="view">{dataTool?.total_visits}</span>
            </p>
            <p>
              Lượt online: <span id="online">{dataTool?.online_users}</span>
            </p>
          </div>
          <WidgetItem widgetName="Footer_Bottom" />
        </div>
      </Container>
    </footer>
  );
};

export default React.memo(Footer);

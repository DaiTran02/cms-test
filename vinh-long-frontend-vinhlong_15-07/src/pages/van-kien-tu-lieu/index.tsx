import Container from '@/components/Container/Container';

import MainLayout from '@/components/MainLayout';
import SectionTitle from '@/components/SectionTitle';
import { useFetchCategory } from '@/hooks/useCategory';

import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import ScDocx from '@/components/Page/HomePage/ScDocx';
import SEO from '@/components/Seo';
import {
  useFetchDocxList,
  useFetchFilteIssuedAgency,
  useFetchFilterDocxType,
  useFetchFilterFieldTypes,
} from '@/hooks/useDocx';
import { fetchServerCateDocxList } from '@/Services/categoryService';
import { fetchWidgetBanner } from '@/Services/mediaService';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import FilterDocx from './FilterDocx';
import TableGroup from './TableGroup';
import { useFetchArticleList } from '@/hooks/useArticle';
import ListArticleSide from '@/components/SideRight/ListArticleSide';
import ListDocxSide from '@/components/SideRight/ListDocxSide';
import DocxList from '@/components/SideRight/DocxList';
type OnSelectTab = (name: string) => void;

const DocxPage = ({ dataServer }: { dataServer: any }) => {
  const [tabCurrent, setTabCurrent] = useState(
    dataServer?.listCateDocx?.[0]?.name
  );
  const [idtabCurrent, setIdTabCurrent] = useState(
    dataServer?.listCateDocx?.[0]?.id
  );
  const path = usePathname() || '';
  const { data: dataCate } = useFetchCategory(path);
  const params = {
    limit: -1,
    skip: 0,
  };
  // lấy dữ liệu lọc cho 1 tabs
  const { data: listFilterDocxType } = useFetchFilterDocxType();
  const { data: listFilterFieldTypes } = useFetchFilterFieldTypes();
  const { data: listFilterissuedAgency } = useFetchFilteIssuedAgency();
  const [filterType, setFilterType] = useState<{
    [key: string]: string | number;
  } | null>(null);

  // chọn Tab
  const onSelectTabs: OnSelectTab = (name: string) => {
    setTabCurrent(name);
    const param = {
      limit: -1,
      skip: 0,
      categoryId: idtabCurrent,
    };
    setFilterType(param);
  };
  const handleOnClickFilter = (value: string, type: string) => {
    const param = {
      [type]: value,
      limit: -1,
      skip: 0,
      categoryId: idtabCurrent,
    };
    setFilterType(param);
  };
  const { data: dataFilter } = useFetchDocxList(params, filterType);
  useEffect(() => {
    const param = {
      limit: -1,
      skip: 0,
      categoryId: idtabCurrent,
    };
    setFilterType(param);
  }, [idtabCurrent]);
  const paramDocx = {
    limit: 4,
  };
  const { data: docxNewest } = useFetchDocxList(paramDocx);
  return (
    <MainLayout dataHeader={dataServer?.bannerheader}>
      <SEO dataCate={dataCate} />
      <Container>
        <SectionTitle
          title={dataCate?.name}
          className="mb-5 pointer-events-none"
        />
        <GridWrapper className="mb-6">
          <ScDocx className="col-span-9" hiddenSideR={true} />
          <div className="col-span-3">
            <SectionTitle title="Văn bản mới nhất" lineLeft={true} />
            <DocxList posts={docxNewest} hasDate={true} />
          </div>
        </GridWrapper>
        <GridWrapper className="max-xl:flex-col-reverse">
          <div className="col-span-9">
            <div className="flex justify-between">
              <div className="flex flex-1 w-full max-lg:max-w-[600px] no-scroll max-lg:overflow-x-scroll">
                {dataServer?.listCateDocx &&
                  dataServer?.listCateDocx?.map((item: any, index: number) => {
                    return (
                      <button
                        onClick={() => {
                          onSelectTabs(item?.name || '');
                          setIdTabCurrent(item?.id);
                        }}
                        className={`whitespace-nowrap border rounded-tl-[5px] rounded-tr-[5px]
                          border-grey-bold px-[5px] py-2
                            cursor-pointer w-full heading-4 uppercase transition-[0.3s] 
                            max-lg:text-12
                            ${
                              tabCurrent == item?.name
                                ? 'bg-white text-red-primary transition-[0.3s]'
                                : 'bg-grey-hover text-grey-bold'
                            }`}
                        key={item?.id || index}
                      >
                        {item?.name}
                      </button>
                    );
                  })}
              </div>
            </div>
            {dataFilter && <TableGroup posts={dataFilter} />}
          </div>
          <div
            className="col-span-3 h-fit side-sticky
            max-xl:grid max-xl:grid-cols-12
           max-md:flex max-md:flex-col"
          >
            {listFilterDocxType?.length >= 0 && (
              <FilterDocx
                handleOnClickFilter={handleOnClickFilter}
                listFilter={listFilterDocxType}
                title="LĨNH VỰC VĂN BẢN"
                type="fieldType"
                className="col-span-4"
              />
            )}
            {listFilterFieldTypes?.length >= 0 && (
              <FilterDocx
                handleOnClickFilter={handleOnClickFilter}
                listFilter={listFilterFieldTypes}
                title="Loại VĂN BẢN"
                className="col-span-4"
                type="documentType"
              />
            )}
            {listFilterissuedAgency?.length >= 0 && (
              <FilterDocx
                handleOnClickFilter={handleOnClickFilter}
                listFilter={listFilterissuedAgency}
                title="Cơ quan ban hành"
                className="col-span-4"
                type="issuedAgencyName"
              />
            )}
          </div>
        </GridWrapper>
      </Container>
    </MainLayout>
  );
};

export default React.memo(DocxPage);
export async function getStaticProps({
  params,
}: {
  params: { alias: string };
}) {
  try {
    const listCateDocx = await fetchServerCateDocxList({});
    const bannerheader = await fetchWidgetBanner('Header_banner');

    const dataServer = {
      listCateDocx: listCateDocx || {},
      bannerheader: bannerheader || {},
    };
    return {
      props: { dataServer },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { dataServer: {} },
      revalidate: 30,
    };
  }
}

import GridWrapper from '@/components/LayoutGrid/GridWrapper';
import SectionTitle from '@/components/SectionTitle';
import DocxList from '@/components/SideRight/DocxList';
import WidgetItem from '@/components/WidgetItem';
import type { Article, PropsGlobal } from '@/interface/propsGlobal';
import type { QueryType } from '@/interface/queryType';

const ScDocx = ({
  posts,
  dataLayoutMain,
  dataLayoutSide,
  className,
  hiddenSideR = false,
}: {
  className?: string;
  posts?: Article[];
  dataLayoutSide?: QueryType;
  dataLayoutMain?: QueryType;
  hiddenSideR?: boolean;
}) => {
  return (
    <div className={`${className}`} id={dataLayoutMain?.sectionName}>
      <GridWrapper className="max-lg-max:flex max-lg:flex-col">
        <div className={`${!hiddenSideR ? 'col-span-9' : 'col-span-12'}`}>
          <SectionTitle
            cateAlias={dataLayoutMain?.cateAlias}
            title={dataLayoutMain?.title}
            className="mb-4"
          />
          <WidgetItem className="tablegrid" widgetName="HomeS_Docx" />
        </div>
        {!hiddenSideR && (
          <div className="col-span-3">
            <DocxList
              titleCenter={true}
              title={dataLayoutSide?.title}
              posts={posts}
              hasBorder={true}
              hasDate={true}
            />
          </div>
        )}
      </GridWrapper>
    </div>
  );
};

export default ScDocx;

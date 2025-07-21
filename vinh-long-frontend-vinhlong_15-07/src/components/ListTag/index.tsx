import { useFetchTagsList } from '@/hooks/useTags';
import Link from 'next/link';
import React from 'react';

const ListTag = ({
  tagIds,
  className,
}: {
  tagIds: string[];
  className?: string;
}) => {
  if (!tagIds) return <></>;
  const paramsTag =
    (tagIds && {
      limit: -1,
      skip: 0,
      tagIds: tagIds.toString(),
    }) ||
    null;
  const { data: listTags } = useFetchTagsList(paramsTag);
  return (
    <div className={`mt-5 ${className}`}>
      <div className="border-y-[1px] border-grey-line py-2 gap-2 flex items-center flex-wrap">
        {listTags &&
          listTags?.map(
            (
              item: { name: string; id: string; alias: string },
              index: number
            ) => (
              <Link
                key={item?.id || index}
                href={`/danh-muc/${item?.alias}?tagId=${item?.id}`}
                className="block whitespace-nowrap p1-3 px-1 bg-grey"
              >
                {item?.name}
              </Link>
            )
          )}
      </div>
    </div>
  );
};

export default ListTag;

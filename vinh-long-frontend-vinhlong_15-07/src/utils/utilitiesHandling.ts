import type { QueryType } from '@/interface/queryType';
import { SPECIAL_PATH } from '../../public/apiTemp/dataVinhLong/specialPath';

export const getLinkToCatePage = (cateAlias: string, type = '') => {
  const alias = cateAlias.trim();

  if (type && type !== '') {
    return formatCatePath(type, alias);
  }
  const isSpecialPath = SPECIAL_PATH.some((item) => item?.alias === alias);
  if (isSpecialPath) {
    return `/${alias}`;
  } else {
    return `/danh-muc/${alias}`;
  }
};
export const convertDisplayRatio = (displayRatio: any) => {
  return displayRatio === 'ratioDefault' ? '3/2' : displayRatio;
};

export const parseParams = (objList: QueryType, limit: number) => {
  let queryParams: QueryType = {};
  queryParams.limit = limit;
  queryParams.skip = objList?.skip ?? 0;
  switch (objList?.listType ?? '') {
    case 'Tin nổi bật':
      queryParams.isFeature = true;
      queryParams.sort = 'isFeatured=desc,publicationTime=desc';
      break;
    case 'Xem nhiều nhất':
      queryParams.isFeature = false;
      queryParams.sort = 'viewTop=desc';
      break;
    case 'Tương tác nhiều nhất':
      queryParams.isFeature = true;
      queryParams.sort = 'commentCount=desc,publicationTime=desc';
      break;
    case 'Tin hỗn hợp':
      queryParams.sort = 'publicationTime=desc,isFeatured=desc';
      break;
    default:
      queryParams.isFeature = false;
      queryParams.sort = 'publicationTime=desc,isFeature=false';
  }
  queryParams.tagIds = objList?.tagIds ?? '';
  queryParams.categoryId = objList?.cateId ?? objList?.cateAlias ?? '';
  queryParams.type = objList?.type ?? '';
  queryParams.includeChildCate = objList?.includeChildCate ?? true;
  queryParams.isRandomArrange = objList?.randomArrange ?? false;
  queryParams.notIncludeArticleIds = objList?.notIncludeArticleIds ?? '';
  return queryParams;
};

export const fixPostContent = (postContent: any) => {
  return postContent
    .split('<figcaption class="text-caption"><p>&nbsp;</p></figcaption>')
    .join('')
    .split('<figcaption class="text-caption">&nbsp;</figcaption>')
    .join('')
    .replace(/contenteditable="true"/g, 'contenteditable="false"');
};
export const formatYYMMDD = (date: Date, type = 'YYMMDD') => {
  const dateN = new Date(date);
  if (type == 'YYMMDD') {
    const dateToMap = dateN
      .toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '-');

    const [DD, MM, YY] = dateToMap.split('-');
    const dateYYMMDD = `${YY}-${MM}-${DD}`;
    return dateYYMMDD;
  }
  if (type == 'dmYY') {
    const dateToMap = dateN.toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    return dateToMap;
  }
};
export const getPostDetailUrl = (
  type: string,
  alias: string,
  id = '',
  shortId = ''
) => {
  switch (type) {
    case 'Emagazine':
      return `/megastory/${alias}${shortId ? `-${shortId}` : `-${id}`}.ngn`;
    case 'Video':
      return `/video/${alias}${shortId ? `-${shortId}` : `-${id}`}.ngn`;
    case 'Audio':
      return `/podcast/${alias}${shortId ? `-${shortId}` : `-${id}`}.ngn`;
    case 'Podcast':
      return `/podcast/${alias}${shortId ? `-${shortId}` : `-${id}`}.ngn`;
    case 'BaiTieuSu':
      return `/danh-muc/co-cau-to-chuc/${alias}${
        shortId ? `-${shortId}` : `-${id}`
      }.ngn`;
    default:
      return `/${alias}${shortId ? `-${shortId}` : `-${id}`}.ngn`;
  }
};
export const formatCatePath = (type = '', alias?: string, id = '') => {
  switch (type) {
    case 'Podcast':
      return `/${alias}`;
    case 'Video':
      return `/${alias}`;
    case 'Anh':
      return `/${alias}`;
    case 'VanKien':
      return `/${alias}`;

    case 'lien-he':
      return `/${alias}`;
    default:
      return `/danh-muc/${alias}`;
  }
};

export const formatBookmarkParams = (params: any) => {
  const {
    itemTarget,
    type,
    itemType,
    limit,
    initSkipParam,
    nextFetchSkipParam,
  } = params;

  if (itemType === '') {
    return {
      itemTarget,
      type,
      limit,
      initSkipParam,
      nextFetchSkipParam,
    };
  }

  return params;
};
export const getDaysOfWeekVi = (year: number, week: number) => {
  const days = [];
  const firstDayOfYear = new Date(year, 0, 1); // Ngày 1 tháng 1
  const firstDayOfWeek = firstDayOfYear.getDay(); // 0 = CN, 1 = Thứ 2, ...

  // Tính offset để tìm thứ Hai đầu tiên trong năm theo ISO (Thứ 2 là ngày đầu tuần)
  const offset = (firstDayOfWeek <= 4 ? 1 : 8) - firstDayOfWeek;
  const firstMonday = new Date(year, 0, 1 + offset);

  // Tính ngày Thứ Hai của tuần cần lấy
  const mondayOfTargetWeek = new Date(firstMonday);
  mondayOfTargetWeek.setDate(firstMonday.getDate() + (week - 1) * 7);

  // Tạo danh sách 7 ngày (Thứ 2 → Chủ Nhật)
  for (let i = 0; i < 7; i++) {
    const date = new Date(mondayOfTargetWeek);
    date.setDate(mondayOfTargetWeek.getDate() + i);
    const dateStr = date.toLocaleDateString('vi-VN', {
      weekday: 'long', // Thứ hai, Ba, Tư...
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const day = date.toLocaleDateString('vi-VN', {
      weekday: 'long', // Thứ hai, Ba, Tư...
    });
    const dateCustom = date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    const dateToMap = date
      .toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .replace(/\//g, '-');

    const [DD, MM, YY] = dateToMap.split('-');
    const dateYYMMDD = `${YY}-${MM}-${DD}`;

    days.push({
      dateFull: dateStr,
      day: day,
      dateToMap: dateYYMMDD,
      date: dateCustom,
    });
  }

  return days;
};

export const getWeekNumber = (date: any) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - Number(firstDayOfYear) + 86400000) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay()) / 7);
};
export const createQueryString = (name: string, value: any) => {
  const params = new URLSearchParams();
  params.set(name, value);

  return params.toString();
};
export const transformBlocks = (
  blocks: { name: string; sections: any[] }[]
) => {
  return blocks.reduce((acc, block) => {
    const sectionMap = block.sections.reduce((sectionAcc, section) => {
      const { name, ...rest } = section;
      sectionAcc[name] = {
        ...rest,
        sectionName: block.name, // Tiêm sectionName vào mỗi section
      };
      return sectionAcc;
    }, {} as Record<string, any>);

    acc[block.name] = sectionMap;
    return acc;
  }, {} as Record<string, any>);
};

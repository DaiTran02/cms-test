import type { ReactNode } from 'react';
import type { LayoutType } from './layoutPage';
import type { Category } from './category';
import type { QueryType } from './queryType';
export interface Article {
  id?: string;
  title?: string;
  type?: string;
  shortId?: string;
  alias?: string;
  publicationTime?: number;
  hasSapo?: boolean;
  prefixTitle?: string;
  sapo?: string;
  excerpt?: string;
  featuredImage?: string;
  external: string;
  postContent?: string;
  tags?: string[];
  featuredMedia?: {
    id?: string;
    alt?: string;
    name?: string;
    description?: string;
    type?: string;
    resolutions?: {
      low: {
        uri: string;
      };
      medium: {
        uri: string;
      };
      high: {
        uri: string;
      };
      original: {
        uri: string;
      };
    };
  };

  category?: {
    categoryId?: string;
    categoryAlias?: string;
    categoryName?: string;
    parentCates?: [];
  };
  penName?: string;
  copyright?: string;
  alterCateIds?: [];
  trash?: boolean;
  postMedia?: {
    name?: string;
    file?: string;
    type?: string;
    caption?: string;
    // disableAd: boolean;
  }[];
  hasAudio?: string;
  articleGA?: { DAY?: [{}]; HOUR?: {} };
}

export interface PropsGlobal {
  isReverse?: boolean;
  hiddenIcon?: boolean;
  catePrefix?: boolean;
  dataLayout?: any;
  hasImg?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  id?: string;
  isLink?: boolean;
  reverseTwoRow?: boolean;
  styleImg?: string;
  title?: string;

  titleSide?: string;
  url?: string;
  titleCenter?: boolean;
  dataLayoutMain?: QueryType;
  dataLayoutSide?: QueryType;
  posts?: Article[];
  layoutPage?: LayoutType;
  lineUnderTitle?: boolean;
  hasTitle?: boolean;
  iconType?: string;

  lineLeft?: boolean;
  hasBorder?: boolean;
  lineBreak?: boolean;
  hasModifiedFirstPost?: boolean;
  hasContent?: string;
  children?: ReactNode;
  hasMiniArticle?: boolean;
  className?: string;
  changeColor?: boolean;
  cateAlias?: string;
  hasCate?: boolean;
  hasDate?: boolean;
  hasSapo?: boolean;

  titleStyle?: string;
  dateStyle?: string;
  cateStyle?: string;
  subtitleStyle?: string;
  sapoStyle?: string;
  align?: string;
  dataArticle?: Article;
  dataCategory?: Category[];
  postsSide?: Article[];
}

export interface DocxType {
  createdTime?: number;
  decisionType?: string;
  docCategoryId?: string;
  documentCode?: string;
  documentType?: string;
  effectiveDate?: number;
  fieldType?: string;
  id?: string;
  issuedAgencyName?: string;
  issuedDate?: string;
  publicInfo?: string;
  shortId?: string;
  signer?: string;
  status?: string;
  summary?: string;
  tenantId?: string;
  trash?: boolean;
  updatedTime?: number;
  updatingUnit?: string;
  validityStatus?: string;
  filePDF?: string[];
  websiteId?: string;
}

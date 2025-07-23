export interface QueryType {
  limit?: number;
  skip?: number;
  title?: string;
  isFeature?: boolean;
  sort?: string;
  viewall?: boolean;
  category?: string;
  weekOfYear?: string;
  year?: string;
  cateId?: string;
  cateAlias?: string;
  notIncludeArticleIds?: string;
  tagIds?: string;
  tags?: string;
  id?: string;
  listType?: string;
  categoryId?: string;
  type?: string;
  includeChildCate?: boolean;
  isRandomArrange?: boolean;
  randomArrange?: boolean;
  websiteId?: string;
  detailAlias?: string;
  preview?: boolean;
  params?: { preview?: boolean };
  sectionName?: string;
  ignoreCurrent?: boolean;

  ignoreDateEmpty?: boolean;
}

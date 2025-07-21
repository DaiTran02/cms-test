export interface Category {
  id?: string;
  name?: string;
  alias?: string;
  type?: string;
  isDisplayOnMenu?: boolean;
  displayType?: string;
  displayOnHeader?: boolean;
  displayOnFooter?: boolean;
  clickAble?: boolean;
  resourceId?: string;
  label?: string;
  url?: string;
  order?: number;
  parentId?: number | null;
  meta?: any;
  subMenu?: any;

  subCates?: [
    {
      id?: string;
      name?: string;
      alias?: string;
      isDisplayOnMenu?: boolean;
      parentId?: string;
      displayOnHeader?: boolean;
      displayOnFooter?: boolean;
      clickAble?: boolean;
      type?: string;
      subCates?: [
        {
          id?: string;
          type?: string;
          name?: string;
          alias?: string;
          isDisplayOnMenu?: boolean;
          clickAble?: boolean;
          displayOnHeader?: boolean;
          displayOnFooter?: boolean;
          parentId?: string;
        }
      ];
    }
  ];
}

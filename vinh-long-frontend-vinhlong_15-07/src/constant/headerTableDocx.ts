import type { DocxType } from '@/interface/propsGlobal';

type HeaderItem = {
  title: string;
  key: keyof DocxType;
};
export const HEADER_TABLE_DOCX: HeaderItem[] = [
  { title: 'Cơ quan ban hành', key: 'issuedAgencyName' },
  { title: 'Số hiệu', key: 'documentCode' },
  { title: 'Ngày ban hành', key: 'issuedDate' },
  { title: 'Người ký', key: 'signer' },
  { title: 'Ngày hiệu lực', key: 'effectiveDate' },
  { title: 'Tình trạng hiệu lực', key: 'validityStatus' },
  { title: 'Đơn vị cập nhật', key: 'updatingUnit' },
  { title: 'Lĩnh vực', key: 'fieldType' },
  { title: 'Loại văn bản', key: 'documentType' },
  { title: 'Công khai', key: 'publicInfo' },
  { title: 'Trích yếu', key: 'summary' },
];

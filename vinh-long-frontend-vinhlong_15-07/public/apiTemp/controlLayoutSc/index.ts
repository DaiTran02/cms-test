interface ControlSCInHome {
  scheduleSection: { isDisplay: boolean; titleReplace?: string };
  civilSevant: { isDisplay: boolean; titleReplace?: string };
  sliderBannerExternal: { isDisplay: boolean; titleReplace?: string };
  scAgency: { isDisplay: boolean };
}
export const IsDisplayInPage: ControlSCInHome = {
  scheduleSection: { isDisplay: true },
  civilSevant: { isDisplay: true, titleReplace: '' }, //thường trực tỉnh ủy
  sliderBannerExternal: {
    isDisplay: true,
  }, //không có tiêu đề  =>> có thể thêm tiêu đề
  scAgency: {
    isDisplay: true, //không có tiêu đề =>> không thể thêm
  },
};

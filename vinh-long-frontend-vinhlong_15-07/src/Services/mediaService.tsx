const fetchOptions = {
  next: { revalidate: 300 },
  headers: {
    'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
  },
};

export async function fetchWidgetBanner(WidgetSlot: string) {
  try {
    const resWidget = await fetch(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/ads/${WidgetSlot}`,
      fetchOptions
    );
    const widgetData = await resWidget.json();
    const listMedia = widgetData?.result.rotator;
    if (listMedia?.length >= 0) {
      const dataMedia = Promise.all(
        listMedia?.map(async (item: any) => {
          const dataMedia = await fetch(
            `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/media/${item?.mediaId}`,
            fetchOptions
          );
          const data = await dataMedia?.json();
          return await { dataAds: { ...item }, dataMedia: data?.result };
        })
      );

      return dataMedia;
    }
    return widgetData;
  } catch (error) {
    console.log('error :>> ', error);
    throw error;
  }
}

import axios from 'axios';

export async function fetchWidget({
  signal,
  widgetId,
}: {
  signal: AbortSignal;
  widgetId: string;
}) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/widget/${widgetId}`,
      {
        signal,
        headers: {
          'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
        },
      }
    );

    const { result } = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchWidgetSlot({
  signal,
  widgetSlot,
}: {
  signal: AbortSignal;
  widgetSlot: string;
}) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/widget/getSlot/${widgetSlot}`,
      {
        signal,
        headers: {
          'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
        },
      }
    );

    const { result } = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
}

import axios from 'axios';

export async function fetchToolView({ signal }: { signal: AbortSignal }) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/tool/tracking-visitor`,
      {},
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

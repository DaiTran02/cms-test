import axios from 'axios';

export async function fetchCheckApi({ signal }: { signal: AbortSignal }) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_CHECK_API}/check-api`,
      {
        signal,
        headers: {
          'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
        },
      }
    );
    if (response) {
      return response?.data;
    }
  } catch (error) {
    console.log(error);
  }
}

import axios from 'axios';
import { el } from 'date-fns/locale';

export async function fetchCategory({
  signal,
  cateId,
}: {
  signal: AbortSignal;
  cateId: string;
}) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/category/${cateId}`,
      {
        signal,
        headers: {
          'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
        },
      }
    );

    const { result } = response.data;
    if (result) {
      return response?.data?.result;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCategoryList({
  signal,
  name,
}: {
  signal: AbortSignal;
  name?: string;
}) {
  let cateType = '';
  if (name == 'Header') {
    cateType = 'cateHeader.json';
  } else if (name == 'Footer') {
    cateType = 'cateFooter.json';
  } else if (name == 'PopUp') {
    cateType = 'cateSpecial.json';
  } else {
    cateType = 'route.json';
  }
  try {
    const response = await axios.get(`/apiTemp/category/${cateType}`, {
      signal,
      headers: {
        'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
      },
    });
    if (response) {
      const { result } = response.data;
      return result;
    }
  } catch (error) {
    console.log(error);
  }
}

// export async function fetchCategoryList({ signal }: { signal: AbortSignal }) {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_VL_BASE_URL}/public/category/list`,
//       {
//         signal,
//         headers: {
//           'X-Website-Id': `${process?.env.NEXT_PUBLIC_WEBSITE_ID}`,
//         },
//       }
//     );
//     if (response) {
//       const { result } = response.data;
//       return result;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

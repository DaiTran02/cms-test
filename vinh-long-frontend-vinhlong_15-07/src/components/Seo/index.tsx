import type { Category } from '@/interface/category';
import type { Article } from '@/interface/propsGlobal';
import { getPostDetailUrl } from '@/utils/utilitiesHandling';
import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  alias?: string;
}

const SEO = ({
  dataArticle,
  dataCate,
}: {
  dataArticle?: Article;
  dataCate?: Category;
}) => {
  return (
    <Head>
      <title>
        {dataCate?.name ||
          dataArticle?.title ||
          process?.env?.NEXT_PUBLIC_TITLE_MAIN}
      </title>
      <meta
        name="description"
        content={
          dataArticle?.sapo ||
          dataArticle?.excerpt ||
          process?.env?.NEXT_PUBLIC_DESC_MAIN
        }
      />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="canonical"
        href={`${process?.env?.NEXT_PUBLIC_SITE_URL}/${
          dataArticle?.type && dataArticle?.alias
            ? getPostDetailUrl(
                dataArticle?.type,
                dataArticle?.alias,
                dataArticle?.id,
                dataArticle?.shortId
              )
            : ''
        }`}
      />
      {/* Open Graph Meta Tags */}
      <meta
        property="og:title"
        content={
          dataCate?.name ||
          dataArticle?.title ||
          process?.env?.NEXT_PUBLIC_TITLE_MAIN
        }
      />
      <meta
        property="og:description"
        content={
          dataArticle?.sapo ||
          dataArticle?.excerpt ||
          process?.env?.NEXT_PUBLIC_DESC_MAIN
        }
      />
      <meta
        property="og:image"
        content={
          dataArticle?.featuredMedia?.resolutions?.low?.uri ||
          dataArticle?.featuredImage ||
          process?.env?.NEXT_PUBLIC_IMAGE_MAIN
        }
      />
      <meta property="og:type" content="website" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={
          dataCate?.name ||
          dataArticle?.title ||
          process?.env?.NEXT_PUBLIC_TITLE_MAIN
        }
      />
      <meta
        name="twitter:description"
        content={
          dataArticle?.sapo ||
          dataArticle?.excerpt ||
          process?.env?.NEXT_PUBLIC_DESC_MAIN
        }
      />
      <meta
        name="twitter:image"
        content={
          dataArticle?.featuredMedia?.resolutions?.low?.uri ||
          dataArticle?.featuredImage ||
          process?.env?.NEXT_PUBLIC_IMAGE_MAIN
        }
      />
    </Head>
  );
};

export default SEO;

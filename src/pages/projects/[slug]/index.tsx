import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import {
  QueryListenerOptions,
  renderMetaTags,
  TitleMetaLinkTag,
  useQuerySubscription,
} from 'react-datocms';

import { Container, Footer, Layout, StructuredText } from 'components';
import { sdk } from 'lib/datocms';
import {
  ProjectBySlugDocument,
  ProjectBySlugQuery,
  ProjectBySlugQueryVariables,
} from 'lib/graphql';

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: await sdk()
    .AllProjectSlugs()
    .then((data) => data.allProjects.map((page) => `/projects/${page.slug}`)),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}: GetStaticPropsContext) => {
  let slug = '';

  if (Array.isArray(params.slug)) {
    slug = params.slug.join('/');
  } else {
    slug = params.slug;
  }

  const graphqlRequest = {
    query: ProjectBySlugDocument.loc?.source.body!,
    initialData: await sdk(preview).ProjectBySlug({ slug: slug ?? '' }),
    preview,
  };

  const subscription: QueryListenerOptions<ProjectBySlugQuery, ProjectBySlugQueryVariables> =
    preview
      ? {
          ...graphqlRequest,
          token: process.env.NEXT_DATOCMS_API_TOKEN,
          environment: process.env.NEXT_DATOCMS_ENVIRONMENT,
        }
      : {
          ...graphqlRequest,
          enabled: false,
        };

  return {
    props: {
      subscription,
      preview,
    },
  };
};

const Project = ({ subscription }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const {
    data: { site, project },
  } = useQuerySubscription<ProjectBySlugQuery, ProjectBySlugQueryVariables>(subscription);

  const metaTags = [...project.seo, ...site.favicon] as TitleMetaLinkTag[];
  const { title, content } = project;

  return (
    <>
      <Layout preview={subscription.preview}>
        <Head>{renderMetaTags(metaTags)}</Head>
        <Container>
          <h1 className="title">{title}</h1>
          <StructuredText content={content} />
        </Container>
        <Footer />
      </Layout>
    </>
  );
};

export default Project;

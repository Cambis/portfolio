import type { GetStaticPropsContext, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { QueryListenerOptions, StructuredText, TitleMetaLinkTag } from 'react-datocms';
import { renderMetaTags, useQuerySubscription } from 'react-datocms';
import { Image } from 'react-datocms';

import { Layout, Container, Footer } from 'components';
import { sdk } from 'lib/datocms';
import type { HomePageQuery, HomePageQueryVariables } from 'lib/graphql';
import { HomePageDocument } from 'lib/graphql';

export const getStaticProps: GetStaticProps = async ({
  preview = false,
}: GetStaticPropsContext) => {
  const graphqlRequest = {
    query: HomePageDocument.loc?.source.body!,
    initialData: await sdk(preview).HomePage(),
    preview,
  };

  const subscription: QueryListenerOptions<HomePageQuery, HomePageQueryVariables> = preview
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
    },
  };
};

const HomePage = ({
  subscription,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
  const {
    data: { site, homePage, skills, projects },
  } = useQuerySubscription<HomePageQuery, HomePageQueryVariables>(subscription);

  const metaTags = [...homePage.seo, ...site.favicon] as TitleMetaLinkTag[];
  const { title, content } = homePage;

  return (
    <Layout preview={subscription.preview}>
      <Head>{renderMetaTags(metaTags)}</Head>
      <Container classNames="flex min-h-screen flex-col items-center justify-center py-2">
        <h1 className="text-6xl font-bold">{title}</h1>

        <div className="prose p-5 text-center lg:prose-xl">
          <StructuredText data={content} />
        </div>

        <h2 className="text-4xl font-bold">My Core Skills</h2>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          {skills.map((skill) => (
            <div key={skill.id} className="block w-64 p-5">
              <img src={skill.icon.url} alt={skill.icon.alt} />
            </div>
          ))}
        </div>

        <h2 className="text-4xl font-bold">My Projects</h2>
        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${encodeURIComponent(project.slug)}`}>
              <a className="block w-1/2 p-5">
                <Image data={project.heroImage.responsiveImage} />
                <h3>{project.title}</h3>
              </a>
            </Link>
          ))}
        </div>
      </Container>
      <Footer />
    </Layout>
  );
};

export default HomePage;

import type { GetStaticPropsContext, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { QueryListenerOptions, StructuredText, TitleMetaLinkTag } from 'react-datocms';
import { renderMetaTags, useQuerySubscription } from 'react-datocms';
import { Image } from 'react-datocms';

import { Layout, Container, Section } from 'components';
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
  const { content } = homePage;

  return (
    <Layout preview={subscription.preview}>
      <Head>{renderMetaTags(metaTags)}</Head>
      <Container classNames="flex min-h-screen flex-col items-center justify-center py-2">
        <Section id="structured-text">
          <div className="prose p-5 text-center lg:prose-xl">
            <StructuredText data={content} />
          </div>
        </Section>

        <Section id="skills">
          <h2 className="text-4xl font-bold">My Core Skills</h2>
          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
            {skills.map((skill) => (
              <div key={skill.id} className="block w-64 p-5">
                <img src={skill.icon.url} alt={skill.icon.alt} />
              </div>
            ))}
          </div>
        </Section>

        <Section id="projects">
          <h2 className="text-4xl font-bold">My Projects</h2>
          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${encodeURIComponent(project.slug)}`}>
                <a className="relative block w-1/2 p-5">
                  <Image data={project.heroImage.responsiveImage} />
                  <div className="z-1 absolute top-0 left-0 right-0 bottom-0 h-full w-full bg-black bg-opacity-50 opacity-0 transition duration-500 ease-in hover:opacity-100">
                    <figcaption className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-4xl font-bold text-white">
                      {project.title}
                    </figcaption>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </Section>

        <h2 id="work" className="text-4xl font-bold">
          My Work (TODO)
        </h2>
      </Container>
    </Layout>
  );
};

export default HomePage;

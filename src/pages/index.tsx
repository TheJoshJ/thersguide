import type {ReactNode} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures/index';
import Heading from '@theme/Heading';
import styled from '@emotion/styled';

const HeroBanner = styled.section`
  padding: 4rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Welcome to TheRSGuide"
      description="Complete beginner's guide to RuneScape 3. Learn setup, getting started, and progression strategies for new players.">
      <main>
        <HeroBanner>
          <div className="container text--center">
            <Heading as="h1" className="hero__title">
              Welcome to TheRSGuide
            </Heading>
            <p className="hero__subtitle">
              Your complete guide to starting and progressing in the world of Gielinor
            </p>
          </div>
        </HeroBanner>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}

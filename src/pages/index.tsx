import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Welcome to TheRSGuide"
      description="Complete beginner's guide to RuneScape 3. Learn setup, getting started, and progression strategies for new players.">
      <main>
        <section className={clsx(styles.heroBanner)}>
          <div className="container text--center">
            <Heading as="h1" className="hero__title">
              Welcome to TheRSGuide
            </Heading>
            <p className="hero__subtitle">
              Your complete guide to starting and progressing in the world of Gielinor
            </p>
          </div>
        </section>
        <HomepageFeatures />
        <div className={styles.floatingContribute}>
          <Link
            className="button button--primary"
            to="/contribute"
            title="Help improve TheRSGuide">
            Contribute
          </Link>
        </div>
      </main>
    </Layout>
  );
}

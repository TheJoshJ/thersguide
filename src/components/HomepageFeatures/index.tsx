import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  buttonText: string;
  buttonLink: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Setup',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Get your RuneScape 3 account ready to play. Learn about account creation, 
        client downloads, and essential settings for the best gaming experience.
      </>
    ),
    buttonText: 'Setup Guide',
    buttonLink: '/setup/overview',
  },
  {
    title: 'Getting Started',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Take your first steps in Gielinor. Complete the tutorial, understand basic 
        controls, and learn how to navigate the world around you.
      </>
    ),
    buttonText: 'Begin Journey',
    buttonLink: '/getting-started',
  },
  {
    title: 'Guides',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Comprehensive guides for all stages of your RuneScape journey. From early game basics 
        to late game strategies, skills, and daily activities.
      </>
    ),
    buttonText: 'View Guides',
    buttonLink: '/guides',
  },
];

function Feature({title, Svg, description, buttonText, buttonLink}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <a href={buttonLink} className={styles.featureButton}>
          {buttonText}
        </a>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styled from '@emotion/styled';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  buttonText: string;
  buttonLink: string;
};

const FeaturesSection = styled.section`
  display: flex;
  align-items: center;
  padding: 2rem 0;
  width: 100%;
`;

const FeatureSvg = styled.svg`
  height: 200px;
  width: 200px;
`;

const FeatureButton = styled.a`
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    color: white;
    text-decoration: none;
  }
`;

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
        <FeatureSvg as={Svg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <FeatureButton href={buttonLink}>
          {buttonText}
        </FeatureButton>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <FeaturesSection>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </FeaturesSection>
  );
}

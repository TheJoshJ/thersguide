import React, { JSX } from 'react';
import Layout from '@theme/Layout';
import MDXPlayground from '../components/MDXPlayground';

export default function Playground(): JSX.Element {
  return (
    <Layout
      title="Playground - TheRSGuide"
      description="Live MDX editor for creating and testing content for TheRSGuide">
      <MDXPlayground />
    </Layout>
  );
}

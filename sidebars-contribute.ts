import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  contributeSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'guide-writing',
        'markdown-guide',
        'mdx-components',
      ],
    },
    {
      type: 'category',
      label: 'MDX Components API',
      items: [
        'mdx-components-api/index',
        'mdx-components-api/skill-quest-requirements',
        'mdx-components-api/requirements-checker',
        'mdx-components-api/user-input',
      ],
    },
    {
      type: 'category',
      label: 'Contribution Process',
      items: [
        'contribution-workflow',
        'contribution-setup',
        'contribution-fork-clone',
        'contribution-create-edit',
        'contribution-test-commit',
        'contribution-submit',
      ],
    },
  ],
};

export default sidebars;

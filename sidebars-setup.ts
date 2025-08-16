import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  setupSidebar: [
    'overview',
    {
      type: 'category',
      label: '🎯 Account Setup',
      items: [
        'client-setup',
        'account-types',
      ],
    },
    {
      type: 'category',
      label: '👤 Profile Setup',
      items: [
        'essential-settings',
      ],
    },
    {
      type: 'category',
      label: '🖥️ Client Setup',
      items: [
        'interface-setup',
        'performance-guide',
        'mobile-setup',
      ],
    },
  ],
};

export default sidebars;

import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  guidesSidebar: [
    'index',
    {
      type: 'category',
      label: 'Early Game',
      items: [
        'early-game/overview',
        'early-game/fishing',
      ],
    },
    'mid-game/overview',
    'late-game/overview',
    'skills/combat',
  ],
};

export default sidebars;

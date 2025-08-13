# Modern React Application with Authentication

A modern React application built with TypeScript, Vite, TailwindCSS, React Router, Tanstack React Query, and Clerk Authentication.

## Features

- ⚡️ **Vite with SWC** - Lightning fast builds and HMR
- 🔒 **TypeScript** - Full type safety
- 🎨 **TailwindCSS 4** - Utility-first CSS framework
- 🧭 **React Router** - Declarative routing for React
- 🔄 **Tanstack React Query** - Data fetching and state management
- 🔐 **Clerk Authentication** - User authentication and management
- 🎭 **ShadCN UI** - Complete component library pre-installed
- 📱 **Responsive Design** - Mobile-first approach
- 🧩 **Component Structure** - Organized component architecture
- 🌙 **Dark/Light Mode** - Theme switching with next-themes

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone this repository:
```bash
git clone https://github.com//TheJoshJ/Vite-Template-App.git
cd Vite-Template-App
```

2. Install dependencies:
```bash
npm install
# or
yarn
# or
pnpm install
```

3. Create a `.env` file in the root directory with your Clerk keys:
```
VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

4. Start the development server:
```bash
npm start
# or
yarn start
# or
pnpm start
```

5. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable components
│   │   ├── auth/         # Authentication components
│   │   └── ui/           # UI components (ShadCN)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   ├── App.tsx           # Main App component
│   ├── index.css         # Global styles
│   ├── main.tsx          # Entry point
│   ├── router.tsx        # Router configuration
│   ├── RouterProvider.tsx # Router provider
│   └── routes.ts         # Routes definition
├── .gitignore
├── components.json       # ShadCN UI components config
├── index.html
├── package.json
├── tailwind.config.js    # TailwindCSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
```

These keys are required for Clerk authentication to work properly. You can get them from your Clerk dashboard.

## Adding New Routes

1. Create a new page component in `src/pages/`
2. Add the route to `src/routes.ts`:

```tsx
export const routes: Record<string, RouteConfig> = {
  // existing routes
  newRoute: {
    path: '/new-route',
    component: NewComponent,
    label: 'New Route',
    visible: true, // set to false if you don't want it in the navbar
  },
}
```

## Authentication

This project uses Clerk for authentication. The Clerk provider is set up in `src/main.tsx` and integrated with React Router in `src/router.tsx`.

## UI Components

This project comes with the complete ShadCN UI component library pre-installed. ShadCN UI provides a comprehensive set of accessible, customizable, and reusable components built on top of Radix UI primitives.

All components are available in the `src/components/ui` directory and can be imported and used directly in your application. The components are styled with TailwindCSS and can be customized to match your design system.

For more information on available components and their usage, refer to the [ShadCN UI documentation](https://ui.shadcn.com/docs).

## Styling

This project uses TailwindCSS for styling with a theme toggle functionality provided by next-themes. Customize the theme in `tailwind.config.js`.

## License

MIT License

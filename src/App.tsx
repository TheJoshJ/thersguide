import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./RouterProvider";
import { ThemeProvider } from "./components/theme-provider";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 60, // 1 hour
        retry: 1,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

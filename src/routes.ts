import { type ComponentType } from "react";
import Home from "./pages/Home/Home";

export interface RouteConfig {
  path: string;
  component: ComponentType<any>;
  label: string;
  visible?: boolean;
  protected?: boolean;
}

export const routes: Record<string, RouteConfig> = {
  home: {
    path: "/",
    component: Home,
    label: "Home",
  },
  // Add more routes here as needed
};

export const visibleRoutes = Object.values(routes).filter(
  (route) => route.visible !== false
);

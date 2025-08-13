import { createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'
import { Layout } from './components/Layout'
import { ClerkRouteProtection } from './components/ClerkRouteProtection'

// Separate routes into protected and public
const publicRoutes = Object.values(routes)
  .filter(route => !route.protected)
  .map(route => ({
    path: route.path,
    element: <route.component />,
  }))

const protectedRoutes = Object.values(routes)
  .filter(route => route.protected)
  .map(route => ({
    path: route.path,
    element: <route.component />,
  }))

  // Create the router with a layout wrapper and protected routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Public routes accessible to all users
      ...publicRoutes,
      
      // Protected routes - requires authentication
      {
        element: <ClerkRouteProtection requireAuth={true} />,
        children: protectedRoutes,
      },
    ],
  }
])

export { router } 
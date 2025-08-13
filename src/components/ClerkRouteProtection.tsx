import { useAuth } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  requireAuth?: boolean;
}

export const ClerkRouteProtection = ({ requireAuth = true }: ProtectedRouteProps) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    // You can render a loading state here
    return <div>Loading authentication...</div>;
  }

  if (requireAuth && !isSignedIn) {
    // Redirect to home if user is not signed in
    return <Navigate to="/" replace />;
  }

  if (!requireAuth && isSignedIn) {
    // Redirect to home if user is already signed in (for login/signup pages)
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}; 
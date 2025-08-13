import { useClerk, useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

export function useAuth() {
  const clerk = useClerk();
  const { isLoaded, isSignedIn, user } = useUser();
  const { userId, sessionId, getToken } = useClerkAuth();

  return {
    isLoaded,
    isSignedIn,
    user,
    userId,
    sessionId,
    getToken,
    signIn: () => clerk.openSignIn({}),
    signOut: () => clerk.signOut(),
  };
} 
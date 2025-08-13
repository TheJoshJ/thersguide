import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { visibleRoutes } from "../routes";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const clerk = useClerk();

  return (
    <nav className="flex justify-end items-center">
      <ul className="flex space-x-4">
        {visibleRoutes.map((route) => (
          <div key={route.path}>
            <Button
              variant="ghost"
              onClick={() => navigate(route.path)}
              className="text-foreground hover:text-primary-200 transition-colors"
            >
              {route.label}
            </Button>
          </div>
        ))}
        <SignedOut>
          <Button
            variant="ghost"
            onClick={() => clerk.openSignIn({})}
            className="text-foreground hover:text-primary-200 transition-colors"
          >
            Sign In
          </Button>
        </SignedOut>
        <SignedIn>
          <Button
            variant="ghost"
            onClick={() => clerk.signOut()}
            className="text-foreground hover:text-primary-200 transition-colors"
          >
            Sign Out
          </Button>
        </SignedIn>
        <ModeToggle />
      </ul>
    </nav>
  );
};

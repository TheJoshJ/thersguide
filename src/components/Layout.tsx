import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { ToastContainer } from "react-toastify";
import { ScrollArea } from "./ui/scroll-area";

export const Layout = () => {
  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <header className="bg-background text-foreground p-2 border-b border-muted">
        <Navbar />
      </header>

      {/* Main Content - flex-grow to take remaining space */}
      <main className="flex-grow overflow-auto">
        <ScrollArea className="h-full">
          <Outlet />
        </ScrollArea>
        <ToastContainer />
      </main>
    </div>
  );
};

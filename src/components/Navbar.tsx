
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Bell, Settings, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Navbar = () => {
  const location = useLocation();
  const [notifications] = useState(3);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">RWI</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Retail Waste Intelligence
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/inventory"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/inventory") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Inventory
            </Link>
            <Link
              to="/smart-pricing"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/smart-pricing") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Smart Pricing
            </Link>
            <Link
              to="/ai-assistant"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/ai-assistant") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              AI Assistant
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
            
            <ThemeToggle />
            
            <Link to="/settings">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>

            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

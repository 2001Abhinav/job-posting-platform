import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Briefcase, Home, Plus, BarChart3 } from "lucide-react";

export default function Navbar() {
  const { isAuthenticated, isLoading } = useAuth();
  const [location] = useLocation();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">JobPost Pro</h1>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/jobs" className={`px-3 py-2 text-sm font-medium transition-colors ${
              location === "/jobs" 
                ? "text-primary border-b-2 border-primary" 
                : "text-gray-700 hover:text-primary"
            }`}>
              Browse Jobs
            </Link>
            
            {isAuthenticated && (
              <>
                <Link href="/post-job" className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location === "/post-job" 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-gray-700 hover:text-primary"
                }`}>
                  Post a Job
                </Link>
                <Link href="/dashboard" className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location === "/dashboard" 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-gray-700 hover:text-primary"
                }`}>
                  Dashboard
                </Link>
              </>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : isAuthenticated ? (
              <Button 
                variant="outline" 
                onClick={() => window.location.href = "/api/logout"}
              >
                Sign Out
              </Button>
            ) : (
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={() => window.location.href = "/api/login"}
                >
                  Sign In
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = "/api/login"}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

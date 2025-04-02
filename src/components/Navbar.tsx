
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MapPin, 
  BarChart2, 
  Info, 
  Heart, 
  Home, 
  Menu, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const routes = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Map', path: '/map', icon: <MapPin className="h-5 w-5" /> },
    { name: 'History', path: '/history', icon: <BarChart2 className="h-5 w-5" /> },
    { name: 'Health', path: '/health', icon: <Heart className="h-5 w-5" /> },
    { name: 'About', path: '/about', icon: <Info className="h-5 w-5" /> },
  ];

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center mr-2">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">AirSenseMumbai</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium flex items-center",
                    location.pathname === route.path
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  )}
                >
                  <span className="mr-2">{route.icon}</span>
                  {route.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium flex items-center",
                  location.pathname === route.path
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="mr-2">{route.icon}</span>
                {route.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';
import { GitHub, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">AirSenseMumbai</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Empowering Mumbai residents with real-time air quality predictions and health recommendations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm">
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm">
                  Historical Data
                </Link>
              </li>
              <li>
                <Link to="/health" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm">
                  Health Impact
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contact</h3>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                <GitHub className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:contact@airsensemumbai.com" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-4">
              Have questions or feedback? Reach out to us!
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} AirSenseMumbai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

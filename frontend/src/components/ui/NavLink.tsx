import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  exact?: boolean;
  mobileLink?: boolean;
  className?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  exact = false,
  mobileLink = false,
  className = '',
}) => {
  const location = useLocation();
  const isActive = exact 
    ? location.pathname === to 
    : location.pathname.startsWith(to);

  const desktopClasses = isActive
    ? 'inline-flex items-center px-1 pt-1 border-b-2 border-blue-500 text-sm font-medium text-gray-900'
    : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition duration-150 ease-in-out';

  const mobileClasses = isActive
    ? 'block pl-3 pr-4 py-2 border-l-4 border-blue-500 text-base font-medium text-blue-700 bg-blue-50'
    : 'block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 transition duration-150 ease-in-out';

  const linkClasses = mobileLink ? mobileClasses : desktopClasses;

  return (
    <Link to={to} className={`${linkClasses} ${className}`}>
      {children}
    </Link>
  );
};
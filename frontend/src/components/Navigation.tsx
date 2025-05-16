import React from 'react';
import { School, Users, Award, Home } from 'lucide-react';
import { NavLink } from '../components/ui/NavLink';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <School className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">StudentTrack</span>
            </div>
          </div>
          
          <div className="hidden md:flex md:space-x-8 md:items-center">
            <NavLink to="/" exact>
              <Home className="h-4 w-4 mr-1" />
              Dashboard
            </NavLink>
            <NavLink to="/add-student">
              <Users className="h-4 w-4 mr-1" />
              Add Student
            </NavLink>
            <NavLink to="/add-marks">
              <Award className="h-4 w-4 mr-1" />
              Add Marks
            </NavLink>
          </div>

          <div className="md:hidden flex items-center">
            <MobileMenu />
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <MobileMenuItems />
    </nav>
  );
};

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-expanded="false"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open main menu</span>
        {!isOpen ? (
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        ) : (
          <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </button>
      
      {isOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 z-10 bg-white shadow-md transition transform duration-300 ease-in-out">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" exact mobileLink>
              <Home className="h-5 w-5 mr-2" />
              Dashboard
            </NavLink>
            <NavLink to="/add-student" mobileLink>
              <Users className="h-5 w-5 mr-2" />
              Add Student
            </NavLink>
            <NavLink to="/add-marks" mobileLink>
              <Award className="h-5 w-5 mr-2" />
              Add Marks
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

// This is a placeholder component for the actual mobile menu items
// It would typically be controlled by state in the real app
const MobileMenuItems: React.FC = () => {
  return null;
};

export default Navigation;
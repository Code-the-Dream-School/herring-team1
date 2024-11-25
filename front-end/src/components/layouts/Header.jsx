import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.jsx';
import { useState } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutUser = () => {
    localStorage.clear();
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background flex items-center justify-between px-6 py-4 sticky top-0 z-10 w-full">
      <div className="flex items-center space-x-1">
        <NavLink to="/" className="text-gray-800 hover:text-purple">
          <img
            src="src/assets/careclogo.png"
            alt="Logo Connect Care"
            className="h-16 w-auto transform hover:scale-110"
          />
        </NavLink>
      </div>

      <button className="md:hidden flex flex-col space-y-1 focus:outline-none" onClick={toggleMenu}>
        <span className="block w-6 h-1 bg-gray-800" />
        <span className="block w-6 h-1 bg-gray-800" />
        <span className="block w-6 h-1 bg-gray-800" />
      </button>

      <div className="hidden md:flex space-x-6">
        <a href="/#mission" className="text-gray-800 hover:text-purple font-bold">
          Our Mission
        </a>
        <a href="/#volunteers" className="text-gray-800 hover:text-purple font-bold">
          Volunteers
        </a>
        <a href="/#organizations" className="text-gray-800 hover:text-purple font-bold">
          Organizations
        </a>
        <NavLink to="/search" className="text-gray-800 hover:text-purple font-bold">
          Find Opportunities
        </NavLink>
        {user ? (
          <>
            <NavLink to="/dashboard">
              <img
                src="/src/assets/profile-user.png"
                alt="Logo Connect Care"
                className="h-6 w-6 transform hover:scale-110"
              />
            </NavLink>
            <NavLink
              to="/auth/login"
              onClick={logoutUser}
              className={({ isActive }) =>
                `rounded-md w-[110px] h-[30px]  text-white flex items-center justify-center  font-bold  bg-light_grey ${isActive ? 'w-[110px] h-[30px] text-white bg-purple hover:bg-gray-400 font-bold flex items-center justify-center rounded-md' : 'text-gray-700 hover:bg-light_grey'}`
              }
            >
              Logout
            </NavLink>
          </>
        ) : (
          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              `w-[110px] h-[30px] text-white bg-purple hover:bg-gray-400 font-bold flex items-center justify-center rounded-md' ${isActive ? 'w-[110px] h-[30px] text-white bg-purple hover:bg-gray-400 font-bold flex items-center justify-center rounded-md' : 'text-gray-700 hover:bg-light_grey rounded-md'}`
            }
          >
            Login
          </NavLink>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-0 bg-white z-20 flex flex-col items-center pt-6 pb-10 shadow-lg rounded-b-lg w-full max-h-120">
          <button className="absolute top-4 right-4 focus:outline-none" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-gray-800"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col space-y-4 mt-6">
            <a
              href="/#mission"
              className="text-gray-800 font-bold py-2 px-4 hover:bg-purple-100 hover:text-purple rounded"
            >
              Our Mission
            </a>
            <a
              href="/#volunteers"
              className="text-gray-800 font-bold py-2 px-4 hover:bg-purple-100 hover:text-purple rounded"
            >
              Volunteers
            </a>
            <a
              href="/#organizations"
              className="text-gray-800 font-bold py-2 px-4 hover:bg-purple-100 hover:text-purple rounded"
            >
              Organizations
            </a>
            <NavLink
              to="/search"
              className="text-gray-800 font-bold py-2 px-4 hover:bg-purple-100 hover:text-purple rounded"
            >
              Find Opportunities
            </NavLink>
            {user ? (
              <>
                <NavLink to="/dashboard" className="flex justify-center items-center">
                  <img
                    src="/src/assets/profile-user.png"
                    alt="Logo Connect Care"
                    className="h-6 w-6 transform hover:scale-110"
                  />
                </NavLink>
                <NavLink
                  to="/auth/login"
                  onClick={logoutUser}
                  className={({ isActive }) =>
                    `rounded-md w-[110px] h-[30px]  text-white flex items-center justify-center  font-bold  bg-light_grey ${isActive ? 'w-[110px] h-[30px] text-white bg-purple hover:bg-gray-400 font-bold flex items-center justify-center rounded-md' : 'text-gray-700 hover:bg-light_grey rounded-md'}`
                  }
                >
                  Logout
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md font-medium ${isActive ? 'w-[110px] h-[30px] text-white bg-purple hover:bg-gray-400 font-bold flex items-center justify-center rounded-md' : 'text-gray-700 hover:bg-light_grey'}`
                }
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

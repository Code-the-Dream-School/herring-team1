import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.jsx';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.clear();
    logout();
    navigate('/login');
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

      <div className="flex space-x-6">
        <NavLink to="/#mission" className="text-gray-800 hover:text-purple font-bold">
          Our Mission
        </NavLink>
        <NavLink to="/#volunteers" className="text-gray-800 hover:text-purple font-bold">
          Volunteers
        </NavLink>
        <NavLink to="/#organizations" className="text-gray-800 hover:text-purple font-bold">
          Organizations
        </NavLink>
        <NavLink to="/search" className="text-gray-800 hover:text-purple font-bold">
          Find Opportunities
        </NavLink>
        {user ? (
          <>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium ${isActive ? 'bg-purple text-white' : 'text-gray-700 hover:bg-light_grey'}`
              }
            >
              My Dashboard
            </NavLink>
            <NavLink
              to="/auth/login"
              onClick={logoutUser}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium ${isActive ? 'bg-purple text-white' : 'text-gray-700 hover:bg-light_grey'}`
              }
            >
              Logout
            </NavLink>
          </>
        ) : (
          <NavLink
            to="/auth/login"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-medium ${isActive ? 'bg-purple text-white' : 'text-gray-700 hover:bg-light_grey'}`
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
}

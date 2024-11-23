import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.jsx';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  const logoutUser = () => {
    localStorage.clear();
    logout();
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-main shadow-md">
      <h1 className="text-xl font-bold">Care Connect</h1>
      <nav className="flex space-x-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium ${isActive ? 'bg-purple text-white' : 'text-gray-700 hover:bg-gray-200'}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/mission"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium ${isActive ? 'bg-purple text-white' : 'text-gray-700 hover:bg-light_grey'}`
          }
        >
          Our Mission
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium ${isActive ? 'bg-purple text-white' : 'text-gray-700 hover:bg-light_grey'}`
          }
        >
          Find Oppotunities
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
      </nav>
    </header>
  );
}

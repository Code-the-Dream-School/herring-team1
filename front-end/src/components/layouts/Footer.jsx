import { Link } from 'react-router-dom';

function Footer() {
  const isHomePage = window.location.pathname === '/';
  return (
    <footer className="bg-light_purple text-white text-center py-4 mt-auto">
      <div className="container text-small mx-auto px-4">
        <div className="flex flex-wrap justify-center space-x-4 md:space-x-6 lg:space-x-8 mb-4 text-sm sm:text-xs lg:text-sm">
          <a href="#" className="hover:underline text-white">
            <i className="fas fa-chevron-up" />
          </a>
          <Link to="/" className="hover:underline text-white">
            Home
          </Link>
          {isHomePage ? (
            <a href="#mission" className="hover:underline text-white">
              Our Mission
            </a>
          ) : (
            <Link to="/#mission" className="hover:underline text-white">
              Our Mission
            </Link>
          )}
          <Link to="/search" className="hover:underline text-white">
            Find Opportunities
          </Link>
          <Link to="/register" className="hover:underline text-white">
            Register
          </Link>
          <Link to="/login" className="hover:underline text-white">
            Login
          </Link>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center text-center space-x-4 mt-2 text-sm sm:text-xs lg:text-sm">
          <div className="flex items-center space-x-8">
            <p>All rights reserved &copy;&nbsp;CareConnect {new Date().getFullYear()} </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-center">
              <Link to="/privacy" className="hover:underline whitespace-nowrap">
                Privacy Policy
              </Link>
              <span className="mx-2 sm:inline-block hidden">|</span>
              <Link to="/legal" className="hover:underline whitespace-nowrap">
                Legal Info
              </Link>
            </div>
            <Link to="/team" className="hover:text-white hover:underline whitespace-nowrap">
              <i className="fas fa-users mr-2" />
              The Team
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

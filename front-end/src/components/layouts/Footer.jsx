import { Link } from 'react-router-dom';

function Footer() {
  const isHomePage = window.location.pathname === '/';
  return (
    <footer className="bg-purple text-white text-center py-4 mt-auto">
      <div className="container text-small mx-auto px-4">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#nav" className="hover:underline text-white">
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
        <div className="flex flex-col md:flex-row justify-center items-center mt-4 text-sm space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex items-center space-x-8">
            <p>All rights reserved &copy; CareConnect {new Date().getFullYear()} </p>
            <div>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>{' '}
              <span className="mx-2">|</span>
              <a href="/legal" className="hover:underline">
                Legal Info
              </a>
            </div>
            <Link to="/team" className="hover:text-white hover:underline">
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

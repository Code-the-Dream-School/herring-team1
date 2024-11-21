import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-purple text-white text-center py-4 mt-auto">
      <p>&copy; CareConnect</p>
      <p>Designed and developed by Herring Team 1 for Code the Dream</p>
      <Link to="/team" className="hover:text-white hover:underline">
        The Team
      </Link>
    </footer>
  );
}

export default Footer;

import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <h2 className="text-2xl">Here will be login form</h2>
      <Link to="/dashboard">
        <button>Login</button>
      </Link>
      <br />
      <Link to="/">
        <button>Cancel</button>
      </Link>
    </div>
  );
}

export default Login;

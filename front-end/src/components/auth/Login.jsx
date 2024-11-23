import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/useAuth.jsx';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url_root = import.meta.env.VITE_REACT_URL;
      const response = await fetch(`${url_root}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auth: {
            email: email,
            password: password,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setResponseMessage('Registration successful!');
      navigate('/dashboard');
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Registration failed');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block font-medium">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-4 border shadow-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block font-medium">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-4 border shadow-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="flex justify-between pt-7">
        <button type="submit" className="w-2/5 px-4 py-2 text-xl bg-orange text-white rounded-md hover:bg-orange-600">
          Login
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-2/5 px-4 py-2 text-xl bg-white border border-red-500 text-red-500 rounded-md hover:bg-red-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Login;

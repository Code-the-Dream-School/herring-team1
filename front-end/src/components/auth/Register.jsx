import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth.jsx';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);
  const [isOrganization, setIsOrganization] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url_root = import.meta.env.VITE_REACT_URL;
      const response = await fetch(`${url_root}auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auth: {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            isOrganization: isOrganization,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setResponseMessage('Registration successful!');
      navigate('/dashboard');
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Registration failed');
      console.log(responseMessage);
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
      <div>
        <label htmlFor="email" className="block font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          value={password_confirmation}
          onChange={(e) => setPassword_confirmation(e.target.value)}
          required
          className="w-full p-4 border shadow-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="flex items-center justify-between md:p-5">
        <label className="flex items-center text-xl">
          <input
            type="radio"
            className="mr-2 size-4 border-gray-300 text-gray-600 focus:ring-gray-600"
            name="organizationType"
            value="true"
            checked={isOrganization === 'true'}
            onChange={(e) => setIsOrganization(e.target.value)}
            required
          />
          Organization
        </label>
        <label className="flex items-center text-xl">
          <input
            type="radio"
            className="mr-2"
            name="organizationType"
            value="false"
            checked={isOrganization === 'false'}
            onChange={(e) => setIsOrganization(e.target.value)}
            required
          />
          Volunteer
        </label>
      </div>

      <div className="flex justify-between">
        <button type="submit" className="w-2/5 px-4 py-2 text-xl bg-orange text-white rounded-md hover:bg-orange-600">
          Register
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

export default Register;

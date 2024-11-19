import './App.css';
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);

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
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setResponseMessage('Registration successful!');
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Registration failed');
    }
  };

  return (
    <div>
      <h1>Care Connect</h1>
      {responseMessage && <p>{responseMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password_confirmation}
            onChange={(e) => setPassword_confirmation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default App;

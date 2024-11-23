import { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);
  const [isOrganization, setIsOrganization] = useState(false);

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
      console.log(data);
      // sessionStorage.setItem('isOrganization', 'true');
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
          <input
            className="border border-black"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className="border border-black"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className="border border-black"
            type="password"
            value={password_confirmation}
            onChange={(e) => setPassword_confirmation(e.target.value)}
            required
          />
        </div>
        <div>
          <div>
            <label>
              <input
                className="border border-black"
                type="radio"
                name="organizationType"
                value="true"
                checked={isOrganization === 'true'}
                onChange={(e) => setIsOrganization(e.target.value)}
                required
              />
              Organization
            </label>
          </div>
          <div>
            <label>
              <input
                className="border border-black"
                type="radio"
                name="organizationType"
                value="false"
                checked={isOrganization === 'false'}
                onChange={(e) => setIsOrganization(e.target.value)}
                required
              />
              Volunteer
            </label>
          </div>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

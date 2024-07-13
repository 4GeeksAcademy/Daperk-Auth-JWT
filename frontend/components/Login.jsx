import React, { useState } from 'react';
import useGlobalReducer from '../hooks/useGlobalReducer'; // Adjust path if necessary

const Login = () => {
  const { store, dispatch } = useGlobalReducer(); // Ensure useGlobalReducer hook is correctly implemented in your project
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: 'update_token', token: data.token });
        // Redirect logic or other actions after successful login
      } else {
        // Handle non-ok response (e.g., show error message)
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 p-3">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
};

export default Login;

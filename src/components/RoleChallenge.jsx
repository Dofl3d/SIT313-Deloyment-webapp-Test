import React, { useState } from 'react';

const RoleChallenge = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [flag, setFlag] = useState('');

  // Simulate login API
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setFlag('');
    setRole('');

    // Simulate network request
    const response = await fakeLoginApi(username, password);
    setMessage(response.message);
    setRole(response.role);
    if (response.role === 'admin') {
      setFlag('Duca{last_hope_in_2025}'); // The flag is only shown to admin users
    }
  };

  // This function simulates a backend login check
  const fakeLoginApi = async (user, pass) => {
    // Credentials are hidden, only discoverable via request interception
    const correctUser = 'admin';
    const correctPass = 'letmein2025';
    if (user === correctUser && pass === correctPass) {
      return {
        message: 'Welcome, admin!',
        role: 'admin'
      };
    }
    if (user === 'user' && pass === 'password') {
      return {
        message: 'Welcome, user!',
        role: 'user'
      };
    }
    return {
      message: 'Invalid username or password.',
      role: ''
    };
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Role-Based Burp Suite Challenge</h2>
      <div style={{ background: '#fffbe6', border: '1px solid #ffe58f', padding: '10px', borderRadius: '6px', marginBottom: '16px', color: '#ad8b00' }}>
        <strong>Hint:</strong> Only users with the <b>admin</b> role can see the flag.<br />
        Try using Burp Suite to intercept and brute-force the login request to discover the admin credentials!
      </div>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 12 }}>
          <label>Username:</label><br />
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password:</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <div style={{ marginTop: 16 }}>{message}</div>}
      {role && <div style={{ marginTop: 8 }}><strong>Role:</strong> {role}</div>}
      {flag && <div style={{ marginTop: 16, color: 'green' }}><strong>Flag:</strong> {flag}</div>}
    </div>
  );
};

export default RoleChallenge;

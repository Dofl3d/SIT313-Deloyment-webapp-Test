import React, { useState } from 'react';

const Email = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setMessage(''); // Clear previous messages when typing
  };

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const sendWelcomeEmail = async () => {
    if (!email) {
      setMessage('Please enter an email address.');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Invalid email format.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/welcome-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipient: email })
      });
      
      const data = await response.json();
      setMessage(data.message || 'Welcome email sent successfully!');
      
      if (response.ok) {
        setEmail(''); // Clear email input on success
      }
    } catch (error) {
      console.error('Error sending welcome email:', error);
      setMessage('Error sending welcome email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendWelcomeEmail();
    }
  };

  return (
    <div className="subscribe-box">
      <div className="subscribe-text">
        <h3>SIGN UP FOR OUR DAILY INSIDER</h3>
      </div>
      <div className="row" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="form-control"
          value={email}
          onChange={handleEmailChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button 
          type="submit" 
          onClick={sendWelcomeEmail}
          disabled={loading || !email}
          style={{
            backgroundColor: loading ? '#ccc' : '#007bff',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {message && (
        <div 
          id="email-output" 
          style={{ 
            marginTop: '20px', 
            color: message.includes('Error') || message.includes('Invalid') ? '#dc3545' : '#28a745',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Email;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Message, Header, Segment, Grid, Icon } from 'semantic-ui-react';
import { loginUser } from '../services/authService';

// Login page component for existing users. Integrates with Firebase Auth.
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes and update form state
  const handleChange = (e, { name, value }) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error on change
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate that both fields are filled
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true); // Show loading spinner
    // Call loginUser from authService to sign in with Firebase
    const result = await loginUser(formData.email, formData.password);
    if (result.success) {
      // On success, redirect to home page
      navigate('/home');
    } else {
      // Show error message from Firebase
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="blue" textAlign="center">
            <Icon name="users" />
            Sign In to DEV@Deakin
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              {error && (
                <Message negative>
                  <Message.Header>Login Failed</Message.Header>
                  <p>{error}</p>
                </Message>
              )}
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="Email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Button 
                color="blue" 
                fluid 
                size="large" 
                type="submit"
                loading={loading}
                disabled={loading}
              >
                Sign In
              </Button>
            </Segment>
          </Form>
          <Message>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Login;

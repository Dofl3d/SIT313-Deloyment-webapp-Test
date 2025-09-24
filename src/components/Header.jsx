import React from 'react';
import { Menu, Input, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../services/authService';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      navigate('/login');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Menu inverted>
      <Menu.Item header onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
        DEV@Deakin
      </Menu.Item>
      <Menu.Item style={{ flex: 1 }}>
        <Input 
          icon='search' 
          placeholder='Search...' 
          fluid
        />
      </Menu.Item>
      <Menu.Menu position='right'>
        {user ? (
          <>
            <Menu.Item onClick={() => navigate('/plans')} style={{ cursor: 'pointer' }}>
              Plans
            </Menu.Item>
            <Menu.Item onClick={() => navigate('/create-post')} style={{ cursor: 'pointer' }}>
              Post
            </Menu.Item>
            <Menu.Item onClick={() => navigate('/find-questions')} style={{ cursor: 'pointer' }}>
              My Questions
            </Menu.Item>
            <Menu.Item>
              Welcome, {user.email}
            </Menu.Item>
            <Menu.Item>
              <Button color="red" size="small" onClick={handleLogout}>
                Logout
              </Button>
            </Menu.Item>
          </>
        ) : (
          <Menu.Item>
            <Button color="blue" size="small" onClick={handleLogin}>
              Login
            </Button>
          </Menu.Item>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
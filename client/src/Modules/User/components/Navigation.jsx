import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Define your menu items
  const settings = [
    { title: 'Profile', path: '/profile' },
    { title: 'Register', path: '/Register' },
    { title: 'Logout', path: '/logout' }
  ];

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/Login');
  };

  return (
    <Menu>
      {settings.map((item) =>
        item.title === 'Logout' && isLoggedIn ? (
          <MenuItem key={item.path} onClick={handleLogout}>
            {item.title}
          </MenuItem>
        ) : (
          item.title !== 'Logout' && (
            <MenuItem
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              disabled={item.title === 'Register' && isLoggedIn}
            >
              {item.title}
            </MenuItem>
          )
        )
      )}
    </Menu>
  );
}

export default Navigation;

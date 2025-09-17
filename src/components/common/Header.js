import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box 
} from '@mui/material';
import { 
  Agriculture as AgricultureIcon,
  Home as HomeIcon,
  PersonAdd as PersonAddIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Register', path: '/register', icon: <PersonAddIcon /> },
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  ];

  return (
    <AppBar position="static" sx={{ 
      background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
      boxShadow: '0 4px 20px rgba(46, 125, 50, 0.3)'
    }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <AgricultureIcon sx={{ mr: 2, fontSize: 32 }} />
          <Typography 
            variant="h5" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #FFFFFF, #E8F5E8)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Krishi-Credit Score
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              color="inherit"
              startIcon={item.icon}
              onClick={() => navigate(item.path)}
              sx={{
                backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                borderRadius: 2,
                px: 2,
                py: 1,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
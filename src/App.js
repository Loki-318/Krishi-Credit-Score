import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './components/HomePage';
import FarmerRegistration from './components/farmer/FarmerRegistration';
import FarmerDashboard from './components/dashboard/FarmerDashboard';
import LocationInput from './components/farmer/LocationInput';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Green for agriculture theme
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#FF9800', // Orange accent
      light: '#FFB74D',
      dark: '#F57C00',
    },
    background: {
      default: '#F1F8E9',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

function App() {
  const [farmerData, setFarmerData] = useState(null);
  const [krishiScore, setKrishiScore] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Header />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route 
                path="/register" 
                element={
                  <FarmerRegistration 
                    onRegistrationComplete={setFarmerData}
                  />
                } 
              />
              <Route 
                path="/location" 
                element={
                  <LocationInput 
                    farmerData={farmerData}
                    onScoreGenerated={setKrishiScore}
                  />
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <FarmerDashboard 
                    farmerData={farmerData}
                    krishiScore={krishiScore}
                  />
                } 
              />
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
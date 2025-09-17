import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
  Alert,
  Chip,
  Divider
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Satellite as SatelliteIcon,
  CloudQueue as WeatherIcon,
  TrendingUp as TrendingIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LocationInput = ({ farmerData, onScoreGenerated }) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
    address: ''
  });
  
  const [processing, setProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [satelliteData, setSatelliteData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [marketData, setMarketData] = useState(null);

  const processingSteps = [
    { label: 'Fetching Satellite Data', icon: <SatelliteIcon />, duration: 2000 },
    { label: 'Analyzing Weather Patterns', icon: <WeatherIcon />, duration: 1500 },
    { label: 'Getting Market Prices', icon: <TrendingIcon />, duration: 1000 },
    { label: 'Calculating Krishi Score', icon: <CheckIcon />, duration: 1500 }
  ];

  const handleLocationSubmit = async () => {
    if (!location.latitude || !location.longitude) {
      return;
    }

    setProcessing(true);
    setCurrentStep(0);

    // Simulate data fetching with realistic delays
    for (let i = 0; i < processingSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, processingSteps[i].duration));
      
      // Simulate data being fetched
      switch (i) {
        case 0:
          setSatelliteData({
            cropHealth: 78,
            vegetationIndex: 0.65,
            soilMoisture: 45,
            landCover: 'Agricultural',
            imageDate: new Date().toLocaleDateString()
          });
          break;
        case 1:
          setWeatherData({
            temperature: 28,
            rainfall: 650,
            humidity: 72,
            windSpeed: 8,
            forecast: 'Favorable'
          });
          break;
        case 2:
          setMarketData({
            avgPrice: farmerData?.primaryCrops[0] === 'Wheat' ? 2150 : 
                      farmerData?.primaryCrops[0] === 'Rice' ? 1890 : 2300,
            priceChange: '+5.2%',
            demand: 'High',
            volatility: 'Low'
          });
          break;
        case 3:
          // Calculate final score
          const baseScore = 650;
          const locationBonus = Math.floor(Math.random() * 100);
          const finalScore = baseScore + locationBonus;
          
          const scoreData = {
            score: finalScore,
            category: finalScore > 750 ? 'Excellent' : finalScore > 650 ? 'Good' : 'Fair',
            loanEligible: finalScore > 600,
            maxLoanAmount: Math.floor(finalScore * 100),
            interestRate: finalScore > 750 ? 8.5 : finalScore > 650 ? 10.2 : 12.5
          };
          
          onScoreGenerated(scoreData);
          break;
      }
    }

    // Navigate to dashboard after processing
    setTimeout(() => {
      setProcessing(false);
      navigate('/dashboard');
    }, 1000);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
          address: `Lat: ${position.coords.latitude.toFixed(6)}, Lng: ${position.coords.longitude.toFixed(6)}`
        });
      });
    }
  };

  // Sample locations for quick demo
  const sampleLocations = [
    { name: 'Punjab Farm', lat: 30.7333, lng: 76.7794, desc: 'Wheat & Rice Belt' },
    { name: 'Maharashtra Farm', lat: 19.7515, lng: 75.7139, desc: 'Cotton & Sugarcane' },
    { name: 'Tamil Nadu Farm', lat: 11.1271, lng: 78.6569, desc: 'Rice & Pulses' },
    { name: 'Gujarat Farm', lat: 22.2587, lng: 71.1924, desc: 'Cotton & Groundnut' }
  ];

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar sx={{ 
            bgcolor: 'primary.main', 
            width: 60, 
            height: 60, 
            mx: 'auto', 
            mb: 2 
          }}>
            <LocationIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Farm Location Details
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Provide your farm's location to analyze satellite and environmental data
          </Typography>
        </Box>

        {!processing ? (
          <>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Enter Coordinates
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Latitude"
                        value={location.latitude}
                        onChange={(e) => setLocation(prev => ({
                          ...prev, 
                          latitude: e.target.value
                        }))}
                        placeholder="30.7333"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Longitude"
                        value={location.longitude}
                        onChange={(e) => setLocation(prev => ({
                          ...prev, 
                          longitude: e.target.value
                        }))}
                        placeholder="76.7794"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        variant="outlined" 
                        onClick={getCurrentLocation}
                        fullWidth
                        startIcon={<LocationIcon />}
                      >
                        Use Current Location
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" gutterBottom>
                    Quick Demo Locations
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {sampleLocations.map((loc, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        onClick={() => setLocation({
                          latitude: loc.lat.toString(),
                          longitude: loc.lng.toString(),
                          address: `${loc.name} - ${loc.desc}`
                        })}
                        sx={{ 
                          justifyContent: 'flex-start',
                          textAlign: 'left',
                          p: 2
                        }}
                      >
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {loc.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {loc.desc} • {loc.lat}, {loc.lng}
                          </Typography>
                        </Box>
                      </Button>
                    ))}
                  </Box>
                </Card>
              </Grid>
            </Grid>

            {location.latitude && location.longitude && (
              <Card sx={{ mt: 3, p: 3, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h6" gutterBottom>
                  Selected Location
                </Typography>
                <Typography variant="body1">
                  📍 {location.address || `${location.latitude}, ${location.longitude}`}
                </Typography>
              </Card>
            )}

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleLocationSubmit}
                disabled={!location.latitude || !location.longitude}
                sx={{ px: 6, py: 2, fontSize: '1.1rem' }}
              >
                Generate Krishi Score
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
              Analyzing Your Farm Data...
            </Typography>
            
            <Box sx={{ mb: 4 }}>
              {processingSteps.map((step, index) => (
                <Card 
                  key={index} 
                  sx={{ 
                    mb: 2, 
                    opacity: currentStep >= index ? 1 : 0.3,
                    transform: currentStep === index ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <CardContent sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    backgroundColor: currentStep === index ? '#e3f2fd' : 'transparent'
                  }}>
                    <Avatar sx={{ 
                      mr: 2,
                      bgcolor: currentStep > index ? 'success.main' : 
                               currentStep === index ? 'primary.main' : 'grey.300'
                    }}>
                      {currentStep > index ? <CheckIcon /> : step.icon}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {step.label}
                      </Typography>
                      {currentStep === index && (
                        <LinearProgress sx={{ mt: 1 }} />
                      )}
                      {currentStep > index && (
                        <Chip 
                          label="Completed" 
                          size="small" 
                          color="success" 
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {satelliteData && (
              <Alert severity="success" sx={{ mb: 2 }}>
                ✅ Satellite data analyzed - Crop health: {satelliteData.cropHealth}%
              </Alert>
            )}
            
            {weatherData && (
              <Alert severity="info" sx={{ mb: 2 }}>
                🌤️ Weather patterns analyzed - Conditions: {weatherData.forecast}
              </Alert>
            )}
            
            {marketData && (
              <Alert severity="success" sx={{ mb: 2 }}>
                📈 Market data fetched - Average price: ₹{marketData.avgPrice}/quintal
              </Alert>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default LocationInput;
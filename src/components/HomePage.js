import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Satellite as SatelliteIcon,
  Assessment as AssessmentIcon,
  CheckCircle as CheckCircleIcon,
  Agriculture as AgricultureIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SatelliteIcon sx={{ fontSize: 40 }} />,
      title: 'Satellite Data Analysis',
      description: 'Real-time crop health monitoring using advanced satellite imagery from ESA Sentinel Hub',
      color: '#4CAF50'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'AI-Powered Scoring',
      description: 'Machine learning algorithms analyze multiple data points to generate accurate credit scores',
      color: '#FF9800'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Instant Results',
      description: 'Get your Krishi Score in seconds with real-time data processing and analysis',
      color: '#2196F3'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure & Private',
      description: 'Bank-grade security with complete privacy protection for your farming data',
      color: '#9C27B0'
    }
  ];

  const benefits = [
    'Access to formal credit without traditional credit history',
    'Lower interest rates based on data-driven risk assessment',
    'Quick loan approvals from banks and microfinance institutions',
    'Government subsidy eligibility tracking',
    'Crop insurance premium optimization',
    'Financial planning tools for better farm management'
  ];

  const stats = [
    { number: '52%', label: 'of Indian farmers are in debt' },
    { number: '600M', label: 'smallholder farmers globally' },
    { number: '₹13L Cr', label: 'annual agricultural credit in India' },
    { number: '65%', label: 'farmers lack formal credit access' }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            Empowering Farmers with
            <br />
            <span style={{ color: '#81C784' }}>AI-Driven Credit Scoring</span>
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
            Generate your Krishi Score using satellite data, weather patterns, and market trends. 
            No traditional credit history required.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => navigate('/register')}
            sx={{ 
              px: 4, 
              py: 2, 
              fontSize: '1.1rem',
              backgroundColor: '#FF9800',
              '&:hover': { backgroundColor: '#F57C00' },
              boxShadow: '0 4px 15px rgba(255, 152, 0, 0.4)'
            }}
          >
            Get Your Krishi Score Now
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Statistics Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
            The Challenge We're Solving
          </Typography>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className="metric-card">
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
            How Krishi-Credit Score Works
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card className="feature-card" sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ backgroundColor: feature.color, mr: 2, width: 60, height: 60 }}>
                        {feature.icon}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Benefits Section */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Benefits for Farmers
              </Typography>
              <List>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemIcon>
                      <CheckCircleIcon sx={{ color: '#4CAF50' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={benefit}
                      primaryTypographyProps={{ variant: 'body1' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                background: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)',
                p: 4,
                textAlign: 'center',
                borderRadius: 4
              }}>
                <AgricultureIcon sx={{ fontSize: 80, color: '#4CAF50', mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                  Join 10,000+ Farmers
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Already using Krishi-Credit Score to access better financial services
                </Typography>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Start Your Journey
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Demo Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            See It In Action
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Watch how our AI analyzes satellite imagery, weather data, and market trends 
            to generate your personalized Krishi Score in real-time.
          </Typography>
          <Card sx={{ 
            maxWidth: 800, 
            mx: 'auto', 
            p: 4,
            background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)'
          }}>
            <Box sx={{ 
              height: 200, 
              backgroundColor: '#666', 
              borderRadius: 2, 
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <Typography variant="h6">Demo Video Placeholder</Typography>
            </Box>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/register')}
              sx={{ 
                backgroundColor: '#FF9800',
                '&:hover': { backgroundColor: '#F57C00' }
              }}
            >
              Try Live Demo
            </Button>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
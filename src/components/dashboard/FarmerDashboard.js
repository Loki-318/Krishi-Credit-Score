import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Chip,
  LinearProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Alert
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  AccountBalance as BankIcon,
  Agriculture as EcoIcon,
  WbSunny as WeatherIcon,
  Satellite as SatelliteIcon,
  Assessment as AssessmentIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

const FarmerDashboard = ({ farmerData, krishiScore }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for charts
  const scoreHistoryData = [
    { month: 'Jan', score: 680 },
    { month: 'Feb', score: 695 },
    { month: 'Mar', score: 720 },
    { month: 'Apr', score: 735 },
    { month: 'May', score: 742 },
  ];

  const cropYieldData = [
    { crop: 'Wheat', thisYear: 45, lastYear: 42, potential: 50 },
    { crop: 'Rice', thisYear: 38, lastYear: 35, potential: 42 },
    { crop: 'Cotton', thisYear: 25, lastYear: 22, potential: 30 },
  ];

  const riskFactors = [
    { name: 'Weather', value: 25, color: '#4CAF50' },
    { name: 'Market', value: 15, color: '#FF9800' },
    { name: 'Soil', value: 10, color: '#2196F3' },
    { name: 'Other', value: 50, color: '#9C27B0' },
  ];

  const loanOptions = [
    {
      bank: 'State Bank of India',
      amount: '₹50,000',
      interest: '8.5%',
      tenure: '12 months',
      status: 'Pre-approved',
      color: 'success'
    },
    {
      bank: 'HDFC Bank',
      amount: '₹75,000',
      interest: '9.2%',
      tenure: '18 months',
      status: 'Eligible',
      color: 'primary'
    },
    {
      bank: 'ICICI Bank',
      amount: '₹1,00,000',
      interest: '10.5%',
      tenure: '24 months',
      status: 'Apply',
      color: 'warning'
    }
  ];

  const recommendations = [
    {
      icon: <EcoIcon color="success" />,
      title: 'Improve Soil Health',
      description: 'Consider organic fertilizers to boost your score by 15-20 points',
      priority: 'High'
    },
    {
      icon: <SatelliteIcon color="primary" />,
      title: 'Crop Diversification',
      description: 'Adding pulses can improve risk profile and increase score',
      priority: 'Medium'
    },
    {
      icon: <WeatherIcon color="warning" />,
      title: 'Weather Insurance',
      description: 'Protect against monsoon risks and improve creditworthiness',
      priority: 'Medium'
    }
  ];

  if (!krishiScore) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" color="text.secondary">
          Complete your registration and location setup to view your dashboard
        </Typography>
      </Box>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 750) return '#4CAF50'; // Green
    if (score >= 650) return '#FF9800'; // Orange
    return '#f44336'; // Red
  };

  const getScoreCategory = (score) => {
    if (score >= 750) return { label: 'Excellent', color: 'success' };
    if (score >= 650) return { label: 'Good', color: 'warning' };
    return { label: 'Fair', color: 'error' };
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', p: 2 }}>
      {/* Header Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: 'primary.main',
              fontSize: '2rem'
            }}>
              {farmerData?.name?.charAt(0) || 'F'}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              Welcome, {farmerData?.name || 'Farmer'}!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {farmerData?.village}, {farmerData?.district}, {farmerData?.state}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {farmerData?.primaryCrops?.map((crop, index) => (
                <Chip key={index} label={crop} variant="outlined" color="primary" />
              ))}
            </Box>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              sx={{ mb: 1 }}
            >
              Download Report
            </Button>
            <Typography variant="caption" display="block" color="text.secondary">
              Last updated: {new Date().toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {/* Krishi Score Card */}
        <Grid item xs={12} md={4}>
          <Card className="score-display" sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
                Your Krishi Score
              </Typography>
              <Typography className="score-number" sx={{ 
                fontSize: '4rem', 
                fontWeight: 'bold',
                color: getScoreColor(krishiScore.score)
              }}>
                {krishiScore.score}
              </Typography>
              <Chip 
                label={getScoreCategory(krishiScore.score).label}
                color={getScoreCategory(krishiScore.score).color}
                sx={{ mt: 2, fontSize: '1rem', py: 2 }}
              />
              <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
                Max Loan Eligible: ₹{krishiScore.maxLoanAmount?.toLocaleString()}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Interest Rate: {krishiScore.interestRate}% per annum
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Key Metrics */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
            <Grid item xs={6} sm={3}>
              <Card className="metric-card">
                <CardContent>
                  <EcoIcon sx={{ fontSize: 40, color: '#4CAF50', mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
                    78%
                  </Typography>
                  <Typography variant="body2">Crop Health</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card className="metric-card">
                <CardContent>
                  <WeatherIcon sx={{ fontSize: 40, color: '#FF9800', mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#E65100' }}>
                    650mm
                  </Typography>
                  <Typography variant="body2">Annual Rainfall</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card className="metric-card">
                <CardContent>
                  <TrendingUpIcon sx={{ fontSize: 40, color: '#2196F3', mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1565C0' }}>
                    +12%
                  </Typography>
                  <Typography variant="body2">Yield Growth</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Card className="metric-card">
                <CardContent>
                  <AssessmentIcon sx={{ fontSize: 40, color: '#9C27B0', mb: 1 }} />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#6A1B9A' }}>
                    {farmerData?.landArea || '2.5'}
                  </Typography>
                  <Typography variant="body2">Acres</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Score Trend Chart */}
        <Grid item xs={12} md={6}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Krishi Score Trend
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={scoreHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[600, 800]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#4CAF50" 
                    strokeWidth={3}
                    dot={{ fill: '#4CAF50', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Crop Yield Comparison */}
        <Grid item xs={12} md={6}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Crop Yield Analysis (tons/acre)
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={cropYieldData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="crop" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="thisYear" fill="#4CAF50" name="This Year" />
                  <Bar dataKey="lastYear" fill="#FF9800" name="Last Year" />
                  <Bar dataKey="potential" fill="#2196F3" name="Potential" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Loan Options */}
        <Grid item xs={12} md={8}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Available Loan Options
              </Typography>
              <Grid container spacing={2}>
                {loanOptions.map((loan, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper 
                      elevation={2} 
                      sx={{ 
                        p: 2, 
                        border: '1px solid #e0e0e0',
                        borderRadius: 2,
                        '&:hover': { boxShadow: 3 }
                      }}
                    >
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <BankIcon />
                          </Avatar>
                        </Grid>
                        <Grid item xs>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {loan.bank}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Amount: {loan.amount} • Interest: {loan.interest} • Tenure: {loan.tenure}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Chip 
                            label={loan.status} 
                            color={loan.color} 
                            variant={loan.status === 'Pre-approved' ? 'filled' : 'outlined'}
                          />
                        </Grid>
                        <Grid item>
                          <Button variant="outlined" size="small">
                            {loan.status === 'Pre-approved' ? 'Accept' : 'Apply'}
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Risk Assessment */}
        <Grid item xs={12} md={4}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Risk Assessment
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={riskFactors}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskFactors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ mt: 2 }}>
                {riskFactors.map((risk, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box 
                      sx={{ 
                        width: 12, 
                        height: 12, 
                        bgcolor: risk.color, 
                        borderRadius: '50%', 
                        mr: 1 
                      }} 
                    />
                    <Typography variant="body2">
                      {risk.name}: {risk.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recommendations */}
        <Grid item xs={12}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Personalized Recommendations
              </Typography>
              <Grid container spacing={3}>
                {recommendations.map((rec, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Paper 
                      elevation={2} 
                      sx={{ 
                        p: 3, 
                        height: '100%',
                        borderRadius: 2,
                        border: '1px solid #e0e0e0'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {rec.icon}
                        <Chip 
                          label={rec.priority} 
                          size="small" 
                          color={rec.priority === 'High' ? 'error' : 'warning'}
                          sx={{ ml: 'auto' }}
                        />
                      </Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {rec.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {rec.description}
                      </Typography>
                      <Button 
                        variant="text" 
                        size="small" 
                        sx={{ mt: 2, p: 0 }}
                      >
                        Learn More →
                      </Button>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Satellite & Weather Data */}
        <Grid item xs={12} md={6}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Satellite Analysis
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box className="satellite-image-container">
                  <Box sx={{ 
                    height: 200, 
                    backgroundColor: '#4CAF50',
                    backgroundImage: 'linear-gradient(45deg, #4CAF50 25%, transparent 25%), linear-gradient(-45deg, #4CAF50 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #4CAF50 75%), linear-gradient(-45deg, transparent 75%, #4CAF50 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                  }}>
                    <Typography variant="h6">Satellite Imagery</Typography>
                  </Box>
                </Box>
              </Box>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon color="success" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Vegetation Index: 0.65" 
                    secondary="Healthy crop growth detected"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <InfoIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Soil Moisture: 45%" 
                    secondary="Adequate irrigation levels"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WarningIcon color="warning" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Land Cover: Agricultural" 
                    secondary="Some boundary irregularities detected"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Market & Weather Info */}
        <Grid item xs={12} md={6}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Market & Weather Updates
              </Typography>
              
              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Market Update:</strong> {farmerData?.primaryCrops?.[0] || 'Wheat'} prices up 5.2% this month
                </Typography>
              </Alert>

              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Weather:</strong> Favorable conditions expected for next 15 days
                </Typography>
              </Alert>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                Current Season Forecast
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Temperature Range
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={70} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary">
                  22°C - 32°C (Optimal)
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Rainfall Probability
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={85} 
                  color="success"
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary">
                  85% chance of adequate rainfall
                </Typography>
              </Box>

              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                View Detailed Forecast
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Farm Performance Analytics */}
        <Grid item xs={12} md={6}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Farm Performance Analytics
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" gutterBottom>
                  Overall Farm Efficiency
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={78} 
                  sx={{ height: 10, borderRadius: 5, mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  78% - Above average for your region
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                      4.2
                    </Typography>
                    <Typography variant="caption">
                      Avg Yield (tons/acre)
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" color="secondary" sx={{ fontWeight: 'bold' }}>
                      ₹52K
                    </Typography>
                    <Typography variant="caption">
                      Annual Revenue
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Key Performance Indicators
                </Typography>
                <List dense>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <TrendingUpIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Yield Improvement: +15%" 
                      secondary="Compared to last season"
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      <EcoIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Sustainable Practices: 85%" 
                      secondary="Excellent environmental score"
                    />
                  </ListItem>
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Financial Summary */}
        <Grid item xs={12} md={6}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Financial Summary
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Paper elevation={1} sx={{ p: 2, textAlign: 'center', bgcolor: '#E8F5E8' }}>
                      <Typography variant="h6" color="success.main" sx={{ fontWeight: 'bold' }}>
                        ₹1.2L
                      </Typography>
                      <Typography variant="caption">
                        Current Assets
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper elevation={1} sx={{ p: 2, textAlign: 'center', bgcolor: '#FFF3E0' }}>
                      <Typography variant="h6" color="warning.main" sx={{ fontWeight: 'bold' }}>
                        ₹35K
                      </Typography>
                      <Typography variant="caption">
                        Outstanding Loans
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={4}>
                    <Paper elevation={1} sx={{ p: 2, textAlign: 'center', bgcolor: '#E3F2FD' }}>
                      <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                        ₹85K
                      </Typography>
                      <Typography variant="caption">
                        Net Worth
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2 }}>
                Credit Utilization
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Used: ₹35,000</Typography>
                  <Typography variant="body2">Available: ₹74,200</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={32} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary">
                  32% utilization - Healthy credit usage
                </Typography>
              </Box>

              <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                Apply for Additional Credit
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Action Items */}
        <Grid item xs={12}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Next Steps:</strong> Your Krishi Score qualifies you for government subsidies. 
              <Button size="small" sx={{ ml: 1 }} variant="outlined">Apply Now</Button>
            </Typography>
          </Alert>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card className="dashboard-card">
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{ py: 2, textAlign: 'center' }}
                    startIcon={<DownloadIcon />}
                  >
                    Download Credit Report
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{ py: 2, textAlign: 'center' }}
                    startIcon={<BankIcon />}
                  >
                    Compare Loan Offers
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{ py: 2, textAlign: 'center' }}
                    startIcon={<AssessmentIcon />}
                  >
                    Schedule Farm Inspection
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{ py: 2, textAlign: 'center' }}
                    startIcon={<WeatherIcon />}
                  >
                    Get Insurance Quote
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FarmerDashboard;
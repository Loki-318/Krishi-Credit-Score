import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Grid,
  Avatar,
  Step,
  Stepper,
  StepLabel,
  Alert,
  CircularProgress
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const steps = ['Personal Details', 'Farm Information', 'Crop Details'];

const cropTypes = [
  'Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Maize', 'Pulses', 
  'Soybean', 'Groundnut', 'Sunflower', 'Mustard', 'Barley', 'Jowar'
];

const states = [
  'Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan',
  'Gujarat', 'Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu',
  'West Bengal', 'Bihar', 'Odisha', 'Jharkhand', 'Chhattisgarh'
];

const FarmerRegistration = ({ onRegistrationComplete }) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal Details
    name: '',
    fatherName: '',
    age: '',
    phone: '',
    aadhar: '',
    state: '',
    district: '',
    village: '',
    
    // Farm Information  
    landArea: '',
    landType: '',
    irrigationType: '',
    farmingExperience: '',
    
    // Crop Details
    primaryCrops: [],
    secondaryCrops: [],
    currentCrop: '',
    expectedYield: '',
    lastYearYield: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onRegistrationComplete(formData);
      navigate('/location');
    }, 2000);
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return formData.name && formData.phone && formData.aadhar && formData.state;
      case 1:
        return formData.landArea && formData.landType && formData.farmingExperience;
      case 2:
        return formData.primaryCrops.length > 0 && formData.currentCrop;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name *"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Father's Name"
                value={formData.fatherName}
                onChange={(e) => handleInputChange('fatherName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number *"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Aadhar Number *"
                value={formData.aadhar}
                onChange={(e) => handleInputChange('aadhar', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>State *</InputLabel>
                <Select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  label="State *"
                >
                  {states.map(state => (
                    <MenuItem key={state} value={state}>{state}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="District"
                value={formData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Village"
                value={formData.village}
                onChange={(e) => handleInputChange('village', e.target.value)}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Farm Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Land Area (acres) *"
                type="number"
                value={formData.landArea}
                onChange={(e) => handleInputChange('landArea', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Land Type *</InputLabel>
                <Select
                  value={formData.landType}
                  onChange={(e) => handleInputChange('landType', e.target.value)}
                  label="Land Type *"
                >
                  <MenuItem value="Irrigated">Irrigated</MenuItem>
                  <MenuItem value="Rain-fed">Rain-fed</MenuItem>
                  <MenuItem value="Mixed">Mixed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Irrigation Type</InputLabel>
                <Select
                  value={formData.irrigationType}
                  onChange={(e) => handleInputChange('irrigationType', e.target.value)}
                  label="Irrigation Type"
                >
                  <MenuItem value="Drip">Drip Irrigation</MenuItem>
                  <MenuItem value="Sprinkler">Sprinkler</MenuItem>
                  <MenuItem value="Flood">Flood Irrigation</MenuItem>
                  <MenuItem value="None">Rain-fed Only</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Farming Experience (years) *"
                type="number"
                value={formData.farmingExperience}
                onChange={(e) => handleInputChange('farmingExperience', e.target.value)}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Crop Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Primary Crops *</InputLabel>
                <Select
                  multiple
                  value={formData.primaryCrops}
                  onChange={(e) => handleInputChange('primaryCrops', e.target.value)}
                  input={<OutlinedInput label="Primary Crops *" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {cropTypes.map(crop => (
                    <MenuItem key={crop} value={crop}>{crop}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Secondary Crops</InputLabel>
                <Select
                  multiple
                  value={formData.secondaryCrops}
                  onChange={(e) => handleInputChange('secondaryCrops', e.target.value)}
                  input={<OutlinedInput label="Secondary Crops" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {cropTypes.map(crop => (
                    <MenuItem key={crop} value={crop}>{crop}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Current Season Crop *</InputLabel>
                <Select
                  value={formData.currentCrop}
                  onChange={(e) => handleInputChange('currentCrop', e.target.value)}
                  label="Current Season Crop *"
                >
                  {cropTypes.map(crop => (
                    <MenuItem key={crop} value={crop}>{crop}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expected Yield (tons/acre)"
                type="number"
                value={formData.expectedYield}
                onChange={(e) => handleInputChange('expectedYield', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Year's Yield (tons)"
                type="number"
                value={formData.lastYearYield}
                onChange={(e) => handleInputChange('lastYearYield', e.target.value)}
              />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar sx={{ 
            bgcolor: 'primary.main', 
            width: 60, 
            height: 60, 
            mx: 'auto', 
            mb: 2 
          }}>
            <PersonIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Farmer Registration
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Let's get your farm details to generate your Krishi Score
          </Typography>
        </Box>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mb: 4 }}>
          {renderStepContent()}
        </Box>

        {loading && (
          <Alert severity="info" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
            <CircularProgress size={20} sx={{ mr: 2 }} />
            Processing your registration...
          </Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0 || loading}
            onClick={handleBack}
            variant="outlined"
            sx={{ px: 4 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!isStepValid() || loading}
            sx={{ px: 4 }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              activeStep === steps.length - 1 ? 'Complete Registration' : 'Next'
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FarmerRegistration;
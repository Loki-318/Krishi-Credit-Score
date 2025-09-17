// Sample data for demo purposes
export const sampleFarmers = [
  {
    id: 'FRM001',
    name: 'Ravi Kumar',
    fatherName: 'Mohan Kumar',
    age: 45,
    phone: '+91-9876543210',
    aadhar: '1234-5678-9012',
    state: 'Punjab',
    district: 'Ludhiana',
    village: 'Khanna',
    landArea: 5.5,
    landType: 'Irrigated',
    irrigationType: 'Drip',
    farmingExperience: 20,
    primaryCrops: ['Wheat', 'Rice'],
    secondaryCrops: ['Mustard'],
    currentCrop: 'Wheat',
    expectedYield: 4.2,
    lastYearYield: 22.5,
    location: {
      latitude: 30.7333,
      longitude: 76.7794
    }
  },
  {
    id: 'FRM002',
    name: 'Sunita Devi',
    fatherName: 'Ram Singh',
    age: 38,
    phone: '+91-9876543211',
    aadhar: '2345-6789-0123',
    state: 'Maharashtra',
    district: 'Nashik',
    village: 'Yeola',
    landArea: 3.2,
    landType: 'Rain-fed',
    irrigationType: 'None',
    farmingExperience: 15,
    primaryCrops: ['Cotton', 'Sugarcane'],
    secondaryCrops: ['Onion'],
    currentCrop: 'Cotton',
    expectedYield: 2.8,
    lastYearYield: 8.5,
    location: {
      latitude: 19.7515,
      longitude: 75.7139
    }
  },
  {
    id: 'FRM003',
    name: 'Murugan S',
    fatherName: 'Selvam S',
    age: 52,
    phone: '+91-9876543212',
    aadhar: '3456-7890-1234',
    state: 'Tamil Nadu',
    district: 'Salem',
    village: 'Attur',
    landArea: 2.8,
    landType: 'Irrigated',
    irrigationType: 'Flood',
    farmingExperience: 25,
    primaryCrops: ['Rice', 'Pulses'],
    secondaryCrops: ['Maize'],
    currentCrop: 'Rice',
    expectedYield: 3.5,
    lastYearYield: 9.8,
    location: {
      latitude: 11.1271,
      longitude: 78.6569
    }
  }
];

export const sampleKrishiScores = {
  'FRM001': {
    score: 742,
    category: 'Good',
    loanEligible: true,
    maxLoanAmount: 74200,
    interestRate: 9.2,
    factors: {
      cropHealth: 78,
      soilQuality: 82,
      weatherResilience: 75,
      marketAccess: 70,
      farmingExperience: 85
    }
  },
  'FRM002': {
    score: 668,
    category: 'Fair',
    loanEligible: true,
    maxLoanAmount: 66800,
    interestRate: 11.5,
    factors: {
      cropHealth: 65,
      soilQuality: 60,
      weatherResilience: 55,
      marketAccess: 75,
      farmingExperience: 70
    }
  },
  'FRM003': {
    score: 795,
    category: 'Excellent',
    loanEligible: true,
    maxLoanAmount: 79500,
    interestRate: 8.5,
    factors: {
      cropHealth: 85,
      soilQuality: 88,
      weatherResilience: 80,
      marketAccess: 72,
      farmingExperience: 95
    }
  }
};

export const satelliteData = {
  'Punjab': {
    cropHealth: 78,
    vegetationIndex: 0.65,
    soilMoisture: 45,
    landCover: 'Agricultural',
    imageDate: '2024-01-15',
    ndvi: 0.72,
    temperature: 18.5,
    precipitation: 125
  },
  'Maharashtra': {
    cropHealth: 65,
    vegetationIndex: 0.58,
    soilMoisture: 32,
    landCover: 'Agricultural',
    imageDate: '2024-01-15',
    ndvi: 0.61,
    temperature: 24.2,
    precipitation: 85
  },
  'Tamil Nadu': {
    cropHealth: 85,
    vegetationIndex: 0.71,
    soilMoisture: 52,
    landCover: 'Agricultural',
    imageDate: '2024-01-15',
    ndvi: 0.78,
    temperature: 26.8,
    precipitation: 165
  }
};

export const marketPrices = {
  'Wheat': {
    currentPrice: 2150,
    previousPrice: 2040,
    change: '+5.2%',
    trend: 'up',
    demand: 'High',
    volatility: 'Low'
  },
  'Rice': {
    currentPrice: 1890,
    previousPrice: 1825,
    change: '+3.6%',
    trend: 'up',
    demand: 'Medium',
    volatility: 'Low'
  },
  'Cotton': {
    currentPrice: 6200,
    previousPrice: 5950,
    change: '+4.2%',
    trend: 'up',
    demand: 'High',
    volatility: 'Medium'
  },
  'Sugarcane': {
    currentPrice: 350,
    previousPrice: 340,
    change: '+2.9%',
    trend: 'up',
    demand: 'Medium',
    volatility: 'Low'
  }
};

export const weatherData = {
  'Punjab': {
    temperature: 22,
    rainfall: 650,
    humidity: 68,
    windSpeed: 12,
    forecast: 'Favorable',
    season: 'Rabi'
  },
  'Maharashtra': {
    temperature: 28,
    rainfall: 450,
    humidity: 55,
    windSpeed: 8,
    forecast: 'Moderate',
    season: 'Kharif'
  },
  'Tamil Nadu': {
    temperature: 30,
    rainfall: 850,
    humidity: 75,
    windSpeed: 6,
    forecast: 'Favorable',
    season: 'Rabi'
  }
};

export const loanProviders = [
  {
    id: 'SBI',
    name: 'State Bank of India',
    type: 'Public Bank',
    minAmount: 25000,
    maxAmount: 500000,
    baseInterestRate: 8.5,
    processingTime: '7-10 days',
    documents: ['Aadhar', 'Land Records', 'Bank Statement'],
    logo: 'sbi-logo.png'
  },
  {
    id: 'HDFC',
    name: 'HDFC Bank',
    type: 'Private Bank',
    minAmount: 50000,
    maxAmount: 1000000,
    baseInterestRate: 9.2,
    processingTime: '5-7 days',
    documents: ['Aadhar', 'Land Records', 'Income Proof'],
    logo: 'hdfc-logo.png'
  },
  {
    id: 'NABARD',
    name: 'NABARD',
    type: 'Development Bank',
    minAmount: 10000,
    maxAmount: 200000,
    baseInterestRate: 7.8,
    processingTime: '10-15 days',
    documents: ['Aadhar', 'Land Records'],
    logo: 'nabard-logo.png'
  }
];

// Helper function to generate random score variations
export const generateScoreHistory = (baseScore, months = 12) => {
  const history = [];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  for (let i = 0; i < months; i++) {
    const variation = (Math.random() - 0.5) * 40; // ±20 point variation
    history.push({
      month: monthNames[i],
      score: Math.max(300, Math.min(850, baseScore + variation))
    });
  }
  return history;
};

// Helper function to calculate loan eligibility
export const calculateLoanEligibility = (krishiScore, landArea) => {
  const baseAmount = krishiScore * 100;
  const landMultiplier = Math.min(landArea, 10) * 0.2; // Cap at 10 acres
  const finalAmount = baseAmount * (1 + landMultiplier);
  
  return {
    eligible: krishiScore >= 550,
    maxAmount: Math.round(finalAmount),
    interestRate: krishiScore >= 750 ? 8.5 : 
                  krishiScore >= 650 ? 10.2 : 12.5,
    tenure: krishiScore >= 700 ? 24 : 18
  };
};
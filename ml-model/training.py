import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import xgboost as xgb
import joblib
import json
from datetime import datetime, timedelta
import random
import warnings
warnings.filterwarnings('ignore')

class KrishiCreditScoreModel:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.label_encoders = {}
        self.feature_importance = None
        self.model_metrics = {}
        
    def generate_sample_data(self, n_samples=1000):
        """Generate realistic sample data for training"""
        np.random.seed(42)
        random.seed(42)
        
        # Define Indian states and their characteristics
        states = {
            'Punjab': {'rainfall': 650, 'temp': 24, 'fertility': 0.85},
            'Haryana': {'rainfall': 600, 'temp': 25, 'fertility': 0.82},
            'Uttar Pradesh': {'rainfall': 1000, 'temp': 26, 'fertility': 0.75},
            'Bihar': {'rainfall': 1200, 'temp': 26, 'fertility': 0.70},
            'West Bengal': {'rainfall': 1500, 'temp': 27, 'fertility': 0.78},
            'Maharashtra': {'rainfall': 1100, 'temp': 27, 'fertility': 0.72},
            'Karnataka': {'rainfall': 1200, 'temp': 25, 'fertility': 0.74},
            'Tamil Nadu': {'rainfall': 950, 'temp': 28, 'fertility': 0.76},
            'Andhra Pradesh': {'rainfall': 950, 'temp': 28, 'fertility': 0.73},
            'Rajasthan': {'rainfall': 550, 'temp': 27, 'fertility': 0.65}
        }
        
        crops = ['wheat', 'rice', 'cotton', 'sugarcane', 'maize', 'soybean', 'mustard', 'bajra']
        irrigation_types = ['canal', 'tube_well', 'rain_fed', 'drip', 'sprinkler']
        
        data = []
        
        for i in range(n_samples):
            # Basic farmer info
            state = random.choice(list(states.keys()))
            state_info = states[state]
            
            # Land and location features
            land_area = round(np.random.lognormal(mean=0.8, sigma=0.6), 2)  # 0.5 to 10 acres typically
            land_area = max(0.1, min(land_area, 50))  # Cap at 50 acres
            
            # Crop and agricultural features
            primary_crop = random.choice(crops)
            irrigation_type = random.choice(irrigation_types)
            
            # Satellite-derived features (normalized 0-1)
            ndvi_current = np.random.beta(6, 2)  # Skewed towards healthy vegetation
            ndvi_3month_avg = ndvi_current + np.random.normal(0, 0.05)
            ndvi_3month_avg = max(0, min(ndvi_3month_avg, 1))
            
            soil_moisture = np.random.beta(4, 3)
            crop_health_index = (ndvi_current + soil_moisture) / 2 + np.random.normal(0, 0.1)
            crop_health_index = max(0, min(crop_health_index, 1))
            
            # Weather features
            rainfall_annual = state_info['rainfall'] + np.random.normal(0, 100)
            rainfall_annual = max(200, min(rainfall_annual, 3000))
            
            avg_temperature = state_info['temp'] + np.random.normal(0, 2)
            weather_risk_score = np.random.beta(3, 7)  # Lower risk generally
            
            # Market and economic features
            market_price_stability = np.random.beta(5, 3)
            distance_to_market = np.random.exponential(15)  # km
            distance_to_market = min(distance_to_market, 200)
            
            # Historical performance
            years_farming = max(1, int(np.random.exponential(8)))  # Experience
            avg_yield_last_3_years = np.random.gamma(2, 2) * land_area  # Depends on land size
            
            # Financial features
            annual_income = avg_yield_last_3_years * random.uniform(15000, 45000)  # Income per yield unit
            existing_loans = random.choice([0, 0, 0, 1, 1, 2])  # Most farmers have 0-2 loans
            loan_repayment_history = np.random.beta(8, 2) if existing_loans > 0 else 1.0
            
            # Technology adoption
            smartphone_usage = random.choice([0, 1])
            modern_techniques = np.random.beta(3, 4)
            
            # Calculate Credit Score (300-850 like CIBIL)
            # Feature engineering for score calculation
            score_components = {
                'crop_health': crop_health_index * 150,  # 0-150
                'land_productivity': min(land_area * 10, 100),  # 0-100
                'weather_resilience': (1 - weather_risk_score) * 100,  # 0-100
                'market_access': min((1 / (distance_to_market + 1)) * 50, 50),  # 0-50
                'experience': min(years_farming * 5, 50),  # 0-50
                'financial_stability': (annual_income / 100000) * 50,  # Income-based
                'repayment_history': loan_repayment_history * 100,  # 0-100
                'tech_adoption': (smartphone_usage * 0.3 + modern_techniques * 0.7) * 50,  # 0-50
                'geographic_advantage': state_info['fertility'] * 100,  # 0-100
                'irrigation_bonus': {'drip': 40, 'sprinkler': 35, 'tube_well': 25, 'canal': 20, 'rain_fed': 0}[irrigation_type]
            }
            
            # Calculate base score
            base_score = sum(score_components.values())
            
            # Add some randomness and normalize to 300-850 range
            raw_score = base_score + np.random.normal(0, 30)
            credit_score = int(300 + (raw_score / 1000) * 550)  # Scale to 300-850
            credit_score = max(300, min(credit_score, 850))
            
            # Risk category
            if credit_score >= 750:
                risk_category = 'LOW'
                loan_eligibility = min(land_area * 50000, 200000)
            elif credit_score >= 650:
                risk_category = 'MEDIUM'
                loan_eligibility = min(land_area * 30000, 100000)
            elif credit_score >= 550:
                risk_category = 'HIGH'
                loan_eligibility = min(land_area * 15000, 50000)
            else:
                risk_category = 'VERY_HIGH'
                loan_eligibility = min(land_area * 5000, 20000)
            
            data.append({
                # Location features
                'state': state,
                'land_area_acres': land_area,
                
                # Crop features
                'primary_crop': primary_crop,
                'irrigation_type': irrigation_type,
                
                # Satellite features
                'ndvi_current': round(ndvi_current, 3),
                'ndvi_3month_avg': round(ndvi_3month_avg, 3),
                'soil_moisture': round(soil_moisture, 3),
                'crop_health_index': round(crop_health_index, 3),
                
                # Weather features
                'rainfall_annual_mm': int(rainfall_annual),
                'avg_temperature_c': round(avg_temperature, 1),
                'weather_risk_score': round(weather_risk_score, 3),
                
                # Market features
                'market_price_stability': round(market_price_stability, 3),
                'distance_to_market_km': round(distance_to_market, 1),
                
                # Historical features
                'years_farming_experience': years_farming,
                'avg_yield_last_3_years': round(avg_yield_last_3_years, 2),
                
                # Financial features
                'annual_income_inr': int(annual_income),
                'existing_loans_count': existing_loans,
                'loan_repayment_history': round(loan_repayment_history, 3),
                
                # Technology features
                'smartphone_usage': smartphone_usage,
                'modern_techniques_adoption': round(modern_techniques, 3),
                
                # Target variables
                'credit_score': credit_score,
                'risk_category': risk_category,
                'loan_eligibility_inr': int(loan_eligibility)
            })
        
        return pd.DataFrame(data)
    
    def preprocess_data(self, df):
        """Preprocess the data for training"""
        # Create a copy to avoid modifying original data
        processed_df = df.copy()
        
        # Encode categorical variables
        categorical_columns = ['state', 'primary_crop', 'irrigation_type', 'risk_category']
        
        for col in categorical_columns:
            if col in processed_df.columns:
                if col not in self.label_encoders:
                    self.label_encoders[col] = LabelEncoder()
                
                # Handle unseen categories during prediction
                try:
                    processed_df[f'{col}_encoded'] = self.label_encoders[col].fit_transform(processed_df[col])
                except:
                    # If new categories appear during prediction
                    processed_df[f'{col}_encoded'] = 0
        
        # Feature engineering
        processed_df['land_productivity_score'] = processed_df['land_area_acres'] * processed_df['crop_health_index']
        processed_df['weather_resilience'] = (processed_df['rainfall_annual_mm'] / 1000) * (1 - processed_df['weather_risk_score'])
        processed_df['financial_stability'] = processed_df['annual_income_inr'] / (processed_df['existing_loans_count'] + 1)
        processed_df['experience_yield_ratio'] = processed_df['years_farming_experience'] * processed_df['avg_yield_last_3_years']
        processed_df['market_accessibility'] = processed_df['market_price_stability'] / (processed_df['distance_to_market_km'] + 1)
        processed_df['tech_adoption_score'] = processed_df['smartphone_usage'] * 0.3 + processed_df['modern_techniques_adoption'] * 0.7
        
        return processed_df
    
    def prepare_features(self, df):
        """Prepare feature matrix for training/prediction"""
        feature_columns = [
            'land_area_acres', 'ndvi_current', 'ndvi_3month_avg', 'soil_moisture',
            'crop_health_index', 'rainfall_annual_mm', 'avg_temperature_c',
            'weather_risk_score', 'market_price_stability', 'distance_to_market_km',
            'years_farming_experience', 'avg_yield_last_3_years', 'annual_income_inr',
            'existing_loans_count', 'loan_repayment_history', 'smartphone_usage',
            'modern_techniques_adoption', 'state_encoded', 'primary_crop_encoded',
            'irrigation_type_encoded', 'land_productivity_score', 'weather_resilience',
            'financial_stability', 'experience_yield_ratio', 'market_accessibility',
            'tech_adoption_score'
        ]
        
        return df[feature_columns]
    
    def train_model(self, df):
        """Train the credit scoring model"""
        print("Preprocessing data...")
        processed_df = self.preprocess_data(df)
        
        print("Preparing features...")
        X = self.prepare_features(processed_df)
        y = processed_df['credit_score']
        
        # Split the data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=pd.cut(y, bins=5)
        )
        
        print(f"Training set size: {X_train.shape[0]}")
        print(f"Test set size: {X_test.shape[0]}")
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Try multiple models and select the best one
        models = {
            'XGBoost': xgb.XGBRegressor(
                n_estimators=200,
                max_depth=6,
                learning_rate=0.1,
                random_state=42,
                n_jobs=-1
            ),
            'RandomForest': RandomForestRegressor(
                n_estimators=200,
                max_depth=10,
                random_state=42,
                n_jobs=-1
            ),
            'GradientBoosting': GradientBoostingRegressor(
                n_estimators=200,
                max_depth=6,
                learning_rate=0.1,
                random_state=42
            )
        }
        
        best_score = -float('inf')
        best_model_name = None
        
        print("\nTraining and evaluating models...")
        for name, model in models.items():
            print(f"\nTraining {name}...")
            
            # Train model
            if name == 'XGBoost':
                model.fit(X_train_scaled, y_train)
                y_pred = model.predict(X_test_scaled)
            else:
                model.fit(X_train_scaled, y_train)
                y_pred = model.predict(X_test_scaled)
            
            # Calculate metrics
            mse = mean_squared_error(y_test, y_pred)
            rmse = np.sqrt(mse)
            mae = mean_absolute_error(y_test, y_pred)
            r2 = r2_score(y_test, y_pred)
            
            print(f"{name} Results:")
            print(f"  RMSE: {rmse:.2f}")
            print(f"  MAE: {mae:.2f}")
            print(f"  R²: {r2:.4f}")
            
            # Select best model based on R² score
            if r2 > best_score:
                best_score = r2
                best_model_name = name
                self.model = model
                
                # Store metrics
                self.model_metrics = {
                    'rmse': rmse,
                    'mae': mae,
                    'r2': r2,
                    'model_type': name
                }
        
        print(f"\nBest model: {best_model_name} (R² = {best_score:.4f})")
        
        # Get feature importance
        if hasattr(self.model, 'feature_importances_'):
            feature_names = X.columns
            importance_df = pd.DataFrame({
                'feature': feature_names,
                'importance': self.model.feature_importances_
            }).sort_values('importance', ascending=False)
            
            self.feature_importance = importance_df
            
            print("\nTop 10 Most Important Features:")
            print(importance_df.head(10))
        
        return self.model_metrics
    
    def predict_credit_score(self, farmer_data):
        """Predict credit score for a single farmer"""
        if self.model is None:
            raise ValueError("Model not trained yet. Call train_model() first.")
        
        # Convert to DataFrame if it's a dict
        if isinstance(farmer_data, dict):
            df = pd.DataFrame([farmer_data])
        else:
            df = farmer_data.copy()
        
        # Preprocess
        processed_df = self.preprocess_data(df)
        X = self.prepare_features(processed_df)
        X_scaled = self.scaler.transform(X)
        
        # Predict
        credit_score = self.model.predict(X_scaled)[0]
        credit_score = max(300, min(int(credit_score), 850))  # Ensure within range
        
        # Determine risk category and loan eligibility
        if credit_score >= 750:
            risk_category = 'LOW'
            loan_eligibility = min(farmer_data.get('land_area_acres', 1) * 50000, 200000)
        elif credit_score >= 650:
            risk_category = 'MEDIUM'
            loan_eligibility = min(farmer_data.get('land_area_acres', 1) * 30000, 100000)
        elif credit_score >= 550:
            risk_category = 'HIGH'
            loan_eligibility = min(farmer_data.get('land_area_acres', 1) * 15000, 50000)
        else:
            risk_category = 'VERY_HIGH'
            loan_eligibility = min(farmer_data.get('land_area_acres', 1) * 5000, 20000)
        
        return {
            'credit_score': credit_score,
            'risk_category': risk_category,
            'loan_eligibility_inr': int(loan_eligibility),
            'confidence': min(self.model_metrics.get('r2', 0.8), 0.95)
        }
    
    def save_model(self, filepath='krishi_credit_model.pkl'):
        """Save the trained model and preprocessors"""
        model_data = {
            'model': self.model,
            'scaler': self.scaler,
            'label_encoders': self.label_encoders,
            'feature_importance': self.feature_importance,
            'model_metrics': self.model_metrics
        }
        joblib.dump(model_data, filepath)
        print(f"Model saved to {filepath}")
    
    def load_model(self, filepath='krishi_credit_model.pkl'):
        """Load a pre-trained model"""
        model_data = joblib.load(filepath)
        self.model = model_data['model']
        self.scaler = model_data['scaler']
        self.label_encoders = model_data['label_encoders']
        self.feature_importance = model_data.get('feature_importance')
        self.model_metrics = model_data.get('model_metrics', {})
        print(f"Model loaded from {filepath}")

# Example usage and testing
if __name__ == "__main__":
    # Initialize the model
    krishi_model = KrishiCreditScoreModel()
    
    # Generate sample data
    print("Generating sample training data...")
    training_data = krishi_model.generate_sample_data(n_samples=1000)
    print(f"Generated {len(training_data)} training samples")
    
    # Display sample data
    print("\nSample data preview:")
    print(training_data.head())
    
    print("\nData statistics:")
    print(training_data.describe())
    
    # Train the model
    print("\n" + "="*50)
    print("TRAINING MODEL")
    print("="*50)
    
    metrics = krishi_model.train_model(training_data)
    
    # Save the model
    krishi_model.save_model('krishi_credit_model.pkl')
    
    # Test prediction with sample farmer
    print("\n" + "="*50)
    print("TESTING PREDICTION")
    print("="*50)
    
    sample_farmer = {
        'state': 'Punjab',
        'land_area_acres': 3.5,
        'primary_crop': 'wheat',
        'irrigation_type': 'tube_well',
        'ndvi_current': 0.8,
        'ndvi_3month_avg': 0.75,
        'soil_moisture': 0.7,
        'crop_health_index': 0.75,
        'rainfall_annual_mm': 650,
        'avg_temperature_c': 24,
        'weather_risk_score': 0.2,
        'market_price_stability': 0.8,
        'distance_to_market_km': 12,
        'years_farming_experience': 8,
        'avg_yield_last_3_years': 7.5,
        'annual_income_inr': 250000,
        'existing_loans_count': 1,
        'loan_repayment_history': 0.95,
        'smartphone_usage': 1,
        'modern_techniques_adoption': 0.6
    }
    
    prediction = krishi_model.predict_credit_score(sample_farmer)
    
    print(f"Sample Farmer: Ravi Kumar from Punjab")
    print(f"Land Area: {sample_farmer['land_area_acres']} acres")
    print(f"Primary Crop: {sample_farmer['primary_crop']}")
    print(f"Annual Income: ₹{sample_farmer['annual_income_inr']:,}")
    print("\nPREDICTION RESULTS:")
    print(f"Credit Score: {prediction['credit_score']}")
    print(f"Risk Category: {prediction['risk_category']}")
    print(f"Loan Eligibility: ₹{prediction['loan_eligibility_inr']:,}")
    print(f"Model Confidence: {prediction['confidence']:.2%}")
    
    print(f"\nModel Performance Metrics:")
    for metric, value in krishi_model.model_metrics.items():
        if isinstance(value, float):
            print(f"{metric.upper()}: {value:.4f}")
        else:
            print(f"{metric.upper()}: {value}")
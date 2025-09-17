import numpy as np
import pandas as pd

# Set random seed for reproducibility
np.random.seed(42)

# Number of samples
num_samples = 1000

# Generate features
avg_ndvi_growing_season = np.random.uniform(0.6, 0.9, num_samples)
peak_ndvi = avg_ndvi_growing_season + np.random.uniform(0.0, 0.05, num_samples)
peak_ndvi = np.clip(peak_ndvi, 0.65, 0.95)

total_rainfall_monsoon_mm = np.random.uniform(200, 1500, num_samples)
days_above_35c = np.random.randint(0, 61, num_samples)
avg_mandi_price_last_3m = np.random.uniform(1500, 4000, num_samples)
price_volatility_1y = np.random.uniform(0.05, 0.4, num_samples)
farm_size_acres = np.random.uniform(0.5, 20, num_samples)

# Realistic relationships
# Normalize each feature between 0 and 1
ndvi_score = (avg_ndvi_growing_season - 0.6) / (0.9 - 0.6)
peak_ndvi_score = (peak_ndvi - 0.65) / (0.95 - 0.65)
rainfall_score = 1 - abs(total_rainfall_monsoon_mm - 800) / 800  # ideal rainfall ~800mm
temperature_score = 1 - (days_above_35c / 60)  # more hot days reduce score
price_stability_score = 1 - (price_volatility_1y - 0.05) / (0.4 - 0.05)
farm_size_score = (farm_size_acres - 0.5) / (20 - 0.5)

# Clip scores between 0 and 1
rainfall_score = np.clip(rainfall_score, 0, 1)
temperature_score = np.clip(temperature_score, 0, 1)
price_stability_score = np.clip(price_stability_score, 0, 1)
farm_size_score = np.clip(farm_size_score, 0, 1)

# Weighted sum to calculate repayment probability
loan_prob = (
    0.35 * ndvi_score +
    0.15 * peak_ndvi_score +
    0.10 * rainfall_score +
    0.10 * temperature_score +
    0.10 * price_stability_score +
    0.20 * farm_size_score
)

# Add some noise
loan_prob = np.clip(loan_prob + np.random.normal(0, 0.03, num_samples), 0, 1)

# Generate binary target
loan_repaid = np.random.binomial(1, loan_prob)

# Create DataFrame
df = pd.DataFrame({
    'avg_ndvi_growing_season': avg_ndvi_growing_season,
    'peak_ndvi': peak_ndvi,
    'total_rainfall_monsoon_mm': total_rainfall_monsoon_mm,
    'days_above_35c': days_above_35c,
    'avg_mandi_price_last_3m': avg_mandi_price_last_3m,
    'price_volatility_1y': price_volatility_1y,
    'farm_size_acres': farm_size_acres,
    'loan_repaid': loan_repaid
})

# Save to CSV
df.to_csv('synthetic_farmer_data.csv', index=False)

print("Realistic synthetic dataset saved as 'synthetic_farmer_data.csv'")

import pandas as pd
df = pd.read_csv('synthetic_farmer_data.csv')
print(df.head())

import numpy as np
import pandas as pd
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, roc_auc_score
import joblib
df = pd.read_csv('synthetic_farmer_data.csv')

# Show first few rows
df.head()
# Separate features and target
X = df.drop(columns=['loan_repaid'])
y = df['loan_repaid']

print("Features shape:", X.shape)
print("Target distribution:\n", y.value_counts(normalize=True))
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print("Train size:", X_train.shape)
print("Test size:", X_test.shape)

# Initialize model
model = XGBClassifier(
    
    eval_metric='logloss',
    random_state=42
)

# Train
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]

print("Classification Report:\n")
print(classification_report(y_test, y_pred))

auc_score = roc_auc_score(y_test, y_proba)
print(f"ROC AUC Score: {auc_score:.4f}")
# Save model to file
model_filename = 'krishi_model.pkl'
joblib.dump(model, model_filename)

print(f"Model saved to {model_filename}")
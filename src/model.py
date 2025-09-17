import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from xgboost import XGBRegressor
from sklearn.metrics import r2_score, mean_squared_error
import numpy as np
import joblib  # for saving/loading the model

# Load dataset
df = pd.read_csv("farmer_credit_dataset.csv")
print("Columns:", list(df.columns))

# Feature columns
feature_cols = [
    'Age', 'Education_Level', 'Land_Acres', 'Land_Ownership', 'Land_Value',
    'Crop_Type', 'Yield_Last_Year', 'Yield_This_Year', 'Irrigation_Availability',
    'Soil_Fertility_Score', 'Mechanization_Level', 'Annual_Farm_Income', 
    'Off_Farm_Income', 'Input_Expenditure', 'Loan_Repayment_History',
    'Existing_Loans_Amount', 'Previous_Defaults', 'Has_Insurance',
    'Market_Access', 'Storage_Facilities', 'Govt_Support', 'Household_Size'
]

target_col = 'Credit_Score'

# Encode categorical columns
cat_cols = ['Education_Level','Land_Ownership','Crop_Type','Irrigation_Availability',
            'Mechanization_Level','Loan_Repayment_History','Has_Insurance',
            'Market_Access','Storage_Facilities','Govt_Support']

for col in cat_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])

# Split
X = df[feature_cols]
y = df[target_col]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Model
model = XGBRegressor(
    n_estimators=200,
    learning_rate=0.1,
    max_depth=5,
    eval_metric='rmse'
)

# Train with verbose logging
eval_set = [(X_train, y_train), (X_test, y_test)]
model.fit(
    X_train, y_train,
    eval_set=eval_set,
    verbose=True
)

# Evaluate
y_pred = model.predict(X_test)
r2 = r2_score(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

print(f"R² Score: {r2:.4f}")
print(f"RMSE: {rmse:.2f}")

# --- SAVE THE MODEL ---
joblib.dump(model, 'farmer_credit_model.pkl')
print("Model saved as farmer_credit_model.pkl")

# --- EXAMPLE: LOAD THE MODEL ---
# loaded_model = joblib.load('farmer_credit_model.pkl')
# y_pred_loaded = loaded_model.predict(X_test)
# print("Loaded model R²:", r2_score(y_test, y_pred_loaded))

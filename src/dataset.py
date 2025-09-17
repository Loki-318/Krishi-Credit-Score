import numpy as np
import pandas as pd
import random

# Seed for reproducibility
np.random.seed(42)

# Possible categorical values
education_levels = ["None", "Primary", "Secondary", "Graduate"]
land_ownerships = ["Owned", "Leased"]
crop_types = ["Rice", "Wheat", "Maize", "Cotton", "Soybean", "Millet", "Pulses"]
loan_histories = ["Poor", "Fair", "Good", "Excellent"]
yes_no = ["Yes", "No"]
market_access_levels = ["Easy", "Moderate", "Hard"]
mechanization_levels = ["None", "Semi", "Full"]

# Credit score helper
def calculate_credit_score(row):
    score = 300
    if row["Land_Ownership"] == "Owned": score += 80
    score += (row["Land_Value"] / 20000)
    score += (row["Soil_Fertility_Score"] * 15)
    if row["Loan_Repayment_History"] == "Excellent": score += 200
    elif row["Loan_Repayment_History"] == "Good": score += 120
    elif row["Loan_Repayment_History"] == "Fair": score += 60
    else: score -= 50
    score -= (row["Previous_Defaults"] * 60)
    if row["Has_Insurance"] == "Yes": score += 50
    if row["Market_Access"] == "Easy": score += 40
    score += (row["Annual_Farm_Income"] / 10000)
    score -= (row["Existing_Loans_Amount"] / 20000)
    return int(np.clip(score, 300, 950))

# Loan amount helper
def calculate_loan_amount(row):
    base = row["Land_Value"] * 0.5 + row["Annual_Farm_Income"] * 0.5
    factor = (row["Credit_Score"] / 800)
    return int(base * factor)

# Generate 500 rows
rows = []
for i in range(500):
    land_acres = round(np.random.uniform(1.0, 10.0), 2)
    land_value = int(land_acres * np.random.randint(100000, 200000))
    yield_last = np.random.randint(1000, 3500)
    yield_this = int(yield_last * np.random.uniform(0.9, 1.2))
    row = {
        "Farmer_ID": f"F{i+1:03d}",
        "Age": np.random.randint(25, 60),
        "Education_Level": random.choice(education_levels),
        "Land_Acres": land_acres,
        "Land_Ownership": random.choice(land_ownerships),
        "Land_Value": land_value,
        "Crop_Type": random.choice(crop_types),
        "Yield_Last_Year": yield_last,
        "Yield_This_Year": yield_this,
        "Irrigation_Availability": random.choice(["Full","Partial","None"]),
        "Soil_Fertility_Score": np.random.randint(3, 10),
        "Mechanization_Level": random.choice(mechanization_levels),
        "Annual_Farm_Income": np.random.randint(100000, 600000),
        "Off_Farm_Income": np.random.randint(0, 100000),
        "Input_Expenditure": np.random.randint(50000, 200000),
        "Loan_Repayment_History": random.choice(loan_histories),
        "Existing_Loans_Amount": np.random.randint(0, 150000),
        "Previous_Defaults": np.random.randint(0, 4),
        "Has_Insurance": random.choice(yes_no),
        "Market_Access": random.choice(market_access_levels),
        "Storage_Facilities": random.choice(yes_no),
        "Govt_Support": random.choice(yes_no),
        "Household_Size": np.random.randint(2, 8),
    }
    row["Credit_Score"] = calculate_credit_score(row)
    row["Eligible_Loan_Amount"] = calculate_loan_amount(row)
    rows.append(row)

# Convert to DataFrame and save
df = pd.DataFrame(rows)
df.to_csv("farmer_credit_dataset.csv", index=False)
print(" farmer_credit_dataset.csv generated with", len(df), "rows")

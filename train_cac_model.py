import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib

# 1. Load Kaggle data
df = pd.read_csv('data/customer_acquisition_data.csv')

# 2. Inspect columns and select features/target
print(df.columns)
# Columns: ['customer_id', 'channel', 'cost', 'conversion_rate', 'revenue']

# 3. Encode categorical variables
df = pd.get_dummies(df, columns=['channel'])

# 4. Prepare features and target
features = [col for col in df.columns if col not in ['customer_id', 'cost']]
X = df[features]
y = df['cost']  # Using 'cost' as CAC proxy

# 5. Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 6. Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 7. Export model
joblib.dump(model, 'cac_predictor.pkl')
print("Model exported as cac_predictor.pkl") 
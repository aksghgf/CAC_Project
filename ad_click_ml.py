import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

# 1. Load data
df = pd.read_csv('data/ad_click_dataset.csv')

# 2. Drop columns not useful for prediction
df = df.drop(['id', 'full_name'], axis=1)

# 3. Handle missing values (fill categorical with 'Unknown', age with median)
for col in ['gender', 'device_type', 'ad_position', 'browsing_history', 'time_of_day']:
    df[col] = df[col].fillna('Unknown')
df['age'] = df['age'].fillna(df['age'].median())

# 4. Encode categorical variables
df = pd.get_dummies(df, columns=['gender', 'device_type', 'ad_position', 'browsing_history', 'time_of_day'])

# 5. Features and target
X = df.drop('click', axis=1)
y = df['click']

# 6. Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 7. Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 8. Predict and evaluate
y_pred = model.predict(X_test)
print('Accuracy:', accuracy_score(y_test, y_pred))
print('\nClassification Report:\n', classification_report(y_test, y_pred))

# 9. Feature importance
importances = pd.Series(model.feature_importances_, index=X.columns)
print('\nTop 10 Important Features:')
print(importances.sort_values(ascending=False).head(10))

# 10. Visualize feature importance
import matplotlib.pyplot as plt
plt.figure(figsize=(10,6))
importances.sort_values(ascending=False).head(10).plot(kind='bar')
plt.title('Top 10 Feature Importances')
plt.ylabel('Importance')
plt.tight_layout()
plt.show() 
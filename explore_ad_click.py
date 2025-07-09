import pandas as pd

# Load the ad click dataset
print('Loading data...')
df = pd.read_csv('data/ad_click_dataset.csv')

# Show the first 5 rows
print('First 5 rows:')
print(df.head())

# Show all column names
print('\nColumns in the dataset:')
print(df.columns.tolist())

# Show basic info
print('\nDataset info:')
print(df.info()) 
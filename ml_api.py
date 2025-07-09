from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)
model = joblib.load('cac_predictor.pkl')

# Get the feature columns from the training script (excluding customer_id and cost)
feature_columns = [
    'conversion_rate', 'revenue',
    'channel_email marketing', 'channel_paid advertising', 'channel_referral', 'channel_social media'
]

@app.route('/optimize-campaign', methods=['POST'])
def optimize_campaign():
    data = request.json
    # Ensure all expected features are present
    input_data = {col: data.get(col, 0) for col in feature_columns}
    df = pd.DataFrame([input_data])
    prediction = model.predict(df)[0]
    return jsonify({'predicted_cac': prediction})

if __name__ == '__main__':
    app.run(port=5001) 
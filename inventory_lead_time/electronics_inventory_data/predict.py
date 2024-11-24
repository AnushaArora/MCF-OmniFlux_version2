import pickle
import json
import sys
import numpy as np
import pandas as pd
import warnings
from sklearn.exceptions import InconsistentVersionWarning

warnings.filterwarnings("ignore", category=InconsistentVersionWarning)
# Load the pickle file
with open(r'E:\amazon sambhav\mcf omniflux\backend_vania\inventory_lead_time\electronics_inventory_data\Electronics_inventory_data.pkl', 'rb') as file:
    model = pickle.load(file)

def predict(input_data):
    # Load the model\
    # Extract only the expected features
    #features = [[d['feature1'], d['feature2']] for d in input_data]
    feature_names = ["Lead time", "Manufacturing lead time"]  # Use the same feature names as during training
    features = pd.DataFrame(input_data)

    # Validate feature names
    missing_features = set(feature_names) - set(features.columns)
    unexpected_features = set(features.columns) - set(feature_names)

    if missing_features:
        raise ValueError(f"Missing features in input data: {missing_features}")
    if unexpected_features:
        raise ValueError(f"Unexpected features in input data: {unexpected_features}")

    # Predict using the model
    predictions = model.predict(features[feature_names])

    return predictions.tolist()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Error: No input data provided. Pass JSON data as a command-line argument.")
        sys.exit(1)
    
    # Take input data from Node.js
    input_data = json.loads(sys.argv[1])
    # Perform prediction
    predictions = predict(input_data)
    # Return predictions as JSON
    print(json.dumps(predictions if isinstance(predictions, list) else predictions.tolist()))

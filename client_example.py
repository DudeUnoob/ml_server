import requests
import json

# URL of the API
url = "http://localhost:8000/predict"

# Example data for prediction
sample_data = {
    "Age": 68,
    "Gender": 1,
    "BloodPressure": 105,
    "Cholesterol": 191,
    "HeartRate": 107,
    "QuantumPatternFeature": 8.36
}

# Make the POST request
response = requests.post(url, json=sample_data)

# Print the response
print("Status code:", response.status_code)
print("Response content:")
print(json.dumps(response.json(), indent=4))

from fastapi import FastAPI
from typing import Union, Dict, List, Any
from .model.model import Model
from .query import PredictionRequest

app = FastAPI()

model = Model()
# Don't instantiate PredictionRequest with no arguments
# request_query = PredictionRequest()  # Remove this line

@app.get("/")
def read_root():
    data_records = model.data.head().to_dict(orient="records")
    return {"data_test": data_records}

@app.post('/predict')
def predict(request: PredictionRequest):
    features = request.model_dump()
    prediction = model.predict(features)
    return {"prediction": prediction}
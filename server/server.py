from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
from typing import Union, Dict, List, Any
from .model.model import Model
from .query import PredictionRequest

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:5173",  # Allow your frontend origin
    "http://127.0.0.1:5173",  # Also allow this if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, HEAD, etc.)
    allow_headers=["*"],  # Allow all headers
)

model = Model()

@app.get("/")
def read_root():
    data_records = model.data.head().to_dict(orient="records")
    return {"data_test": data_records}

@app.post('/predict')
def predict(request: PredictionRequest):
    features = request.model_dump()
    prediction = model.predict(features)
    return {"prediction": prediction}
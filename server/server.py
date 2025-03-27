from fastapi import FastAPI
from typing import Union, Dict, List, Any
from .model import Model  # Use relative import with dot prefix

app = FastAPI()

@app.get("/")
def read_root():
    model = Model()
    
    data_records = model.data.head().to_dict(orient="records")
    
   
    return {"data_test": data_records}


@app.get('/predict')
def predict():
    model = Model()
    prediction = model.predict()
    return {"prediction": prediction}
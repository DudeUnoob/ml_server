import pandas as pd
import numpy as np
import joblib
from pathlib import Path


class Model:
    def __init__(self):
       
        current_dir = Path(__file__).parent.parent
        data_path = current_dir / 'data' / 'heart_data.csv'
        model_path = current_dir / 'model' / 'model.pkl'

        
        self.data = pd.read_csv(data_path).dropna().drop_duplicates().reset_index(drop=True)

        if model_path.exists():
            self.loaded_model = joblib.load(model_path)
        else:
            raise FileNotFoundError(f"Model file not found at {model_path}")

    def predict(self, features) -> int:
        
        print(features)
        
        input_df = pd.DataFrame([features])
    
        print(input_df)
        
        final_prediction = self.loaded_model.predict(input_df)
        
        print(final_prediction[0])
       
        return int(final_prediction[0])
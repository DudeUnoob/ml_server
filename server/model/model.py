import pandas as pd
import numpy as np

import os
from pathlib import Path


class Model():
    def __init__(self):
        # Get the path relative to this file
        current_dir = Path(__file__).parent.parent
        data_path = current_dir / 'data' / 'heart_data.csv'
        self.data = pd.read_csv(data_path)
        self.data = self.data.dropna()
        self.data = self.data.drop_duplicates()
        self.data = self.data.reset_index(drop=True)
        
        
    def predict(self,  ) -> int:
        return np.random.randint(0, 100)
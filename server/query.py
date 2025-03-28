from pydantic import BaseModel,  Field, field_validator


class PredictionRequest(BaseModel):
    Age: int = Field(..., ge=0, le=120, description="Patient's age")
    Gender: int = Field(..., ge=0, le=1, description="Patient's gender (0: Female, 1: Male)")
    BloodPressure: int = Field(..., ge=0, le=300, description="Blood pressure reading")
    Cholesterol: int = Field(..., ge=0, le=600, description="Cholesterol level")
    HeartRate: int = Field(..., ge=30, le=220, description="Heart rate in beats per minute")
    #QuantumPatternFeature: float = Field(..., description="Quantum pattern feature value")
    
    
    @field_validator("Age")
    def validate_age(cls, value):
        if value < 1 or value > 120:
            raise ValueError(f"Age must be a reasonable age")
        return value
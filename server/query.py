from pydantic import BaseModel,  Field, field_validator


class PredictionRequest(BaseModel):
    Age: int = Field(..., ge=0, le=120, description="Patient's age")
    Sex: int = Field(..., ge=0, le=1, description="Patient's gender (0: Female, 1: Male)")
    ChestPainType: int = Field(..., ge=0, le=4, description="Chest Pain Type")
    RestingBP: int = Field(..., ge=0, le=600, description="Cholesterol level")
    Cholesterol: int = Field(...,  description="Heart rate in beats per minute")
    FastingBS: int = Field(..., ge=0, le=1)
    RestingECG: int = Field(..., ge=0, le=2)
    MaxHR: int = Field(..., ge=60, le=202)
    ExerciseAngina: int = Field(..., ge=0, le=1)
    Oldpeak: float = Field(...)
    ST_Slope: int = Field(...,ge=0, le=2)
 
    
    
    @field_validator("Age")
    def validate_age(cls, value):
        if value < 1 or value > 120:
            raise ValueError(f"Age must be a reasonable age")
        return value
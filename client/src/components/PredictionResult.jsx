"use client"

function PredictionResult({ prediction, formData, onReset }) {
  // Helper function to get human-readable values
  const getReadableValue = (key, value) => {
    switch (key) {
      case "Sex":
        return value === 1 ? "Male" : "Female"
      case "ChestPainType":
        const chestPainTypes = [
          "Typical Angina (TA)",
          "Atypical Angina (ATA)",
          "Non-Anginal Pain (NAP)",
          "Asymptomatic (ASY)",
        ]
        return chestPainTypes[value]
      case "RestingECG":
        const ecgTypes = ["Normal", "ST", "LVH"]
        return ecgTypes[value]
      case "ExerciseAngina":
        return value === 1 ? "Yes" : "No"
      case "FastingBS":
        return value === 1 ? "> 120 mg/dl" : "< 120 mg/dl"
      case "ST_Slope":
        const slopes = ["", "Upsloping", "Flat", "Downsloping"]
        return slopes[value]
      default:
        return value
    }
  }

  // Handle different prediction response formats
  const predictionValue =
    typeof prediction === "object" && prediction !== null ? prediction.prediction || 0 : Number(prediction)

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-lg ${predictionValue === 1 ? "bg-red-100" : "bg-green-100"}`}>
        <h2 className="text-2xl font-bold mb-4">Prediction Result</h2>
        <div className="flex items-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${predictionValue === 1 ? "bg-red-500" : "bg-green-500"} text-white text-2xl font-bold mr-4`}
          >
            {predictionValue === 1 ? "!" : "✓"}
          </div>
          <div>
            <p className="text-xl font-semibold">
              {predictionValue === 1 ? "High Risk of Heart Disease" : "Low Risk of Heart Disease"}
            </p>
            <p className="text-gray-600 mt-1">
              {predictionValue === 1
                ? "Based on the provided data, our model predicts a high risk of heart disease."
                : "Based on the provided data, our model predicts a low risk of heart disease."}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Input Data Summary</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="border-b pb-2">
              <span className="text-gray-600 text-sm">{key}:</span>{" "}
              <span className="font-medium">{getReadableValue(key, value)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={onReset} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
          Try Another Prediction
        </button>

        {predictionValue === 1 && (
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() =>
              window.open(
                "https://www.heart.org/en/health-topics/heart-attack/warning-signs-of-a-heart-attack",
                "_blank",
              )
            }
          >
            Learn More About Heart Disease
          </button>
        )}
      </div>
    </div>
  )
}

export default PredictionResult

function InfoPanel() {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">About Heart Disease Prediction</h2>
  
        <div className="space-y-4 text-gray-700">
          <p>This tool uses machine learning to predict the risk of heart disease based on various health metrics.</p>
  
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Key Risk Factors:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Age - Risk increases with age</li>
              <li>Sex - Men are generally at higher risk</li>
              <li>Chest Pain Type - Asymptomatic chest pain can be concerning</li>
              <li>High Blood Pressure - Above 140/90 mmHg</li>
              <li>Cholesterol Levels - Above 200 mg/dL</li>
              <li>Fasting Blood Sugar - Above 120 mg/dL</li>
              <li>Abnormal ECG Results</li>
              <li>Maximum Heart Rate - Lower than expected</li>
              <li>Exercise-Induced Angina</li>
              <li>ST Depression (Oldpeak)</li>
              <li>ST Slope - Downsloping is concerning</li>
            </ul>
          </div>
  
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-medium text-blue-800 mb-2">Important Note:</h3>
            <p className="text-blue-700 text-sm">
              This tool is for educational purposes only and should not replace professional medical advice. Always
              consult with a healthcare provider for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  export default InfoPanel
  
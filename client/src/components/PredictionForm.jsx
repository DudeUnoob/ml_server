"use client"

import { useState } from "react"

function PredictionForm({ onPredict, loading }) {
  const initialFormState = {
    //36,M,NAP,130,209,0,Normal,178,N,0,Up,0
    Age: 36,
    Sex: 1, // Default to Male (1)
    ChestPainType: 2, // Default to TA (0)
    RestingBP: 130,
    Cholesterol: 209,
    FastingBS: 0,
    RestingECG: 0, // Default to Normal (0)
    MaxHR: 178,
    ExerciseAngina: 0, // Default to N (0)
    Oldpeak: 0,
    ST_Slope: 1, // Default to Upsloping (1)
  }

  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target

    // Convert to appropriate type
    const processedValue = name === "Oldpeak" ? Number.parseFloat(value) : Number.parseInt(value, 10)

    setFormData({
      ...formData,
      [name]: processedValue,
    })

    // Clear error for this field when user changes it
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Validate Age (must be between 0-120)
    if (isNaN(formData.Age) || formData.Age < 0 || formData.Age > 120) {
      newErrors.Age = "Age must be between 0 and 120"
    }

    // Validate Sex (must be 0 or 1)
    if (![0, 1].includes(formData.Sex)) {
      newErrors.Sex = "Sex must be 0 (Female) or 1 (Male)"
    }

    // Validate ChestPainType (must be between 0-3)
    if (isNaN(formData.ChestPainType) || formData.ChestPainType < 0 || formData.ChestPainType > 3) {
      newErrors.ChestPainType = "Chest Pain Type must be between 0 and 3"
    }

    // Validate RestingBP (must be between 0-600)
    if (isNaN(formData.RestingBP) || formData.RestingBP < 0 || formData.RestingBP > 600) {
      newErrors.RestingBP = "Resting BP must be between 0 and 600"
    }

    // Validate Cholesterol (no specific range in the backend)
    if (isNaN(formData.Cholesterol) || formData.Cholesterol < 0) {
      newErrors.Cholesterol = "Cholesterol must be a positive number"
    }

    // Validate FastingBS (must be 0 or 1)
    if (![0, 1].includes(formData.FastingBS)) {
      newErrors.FastingBS = "Fasting Blood Sugar must be 0 or 1"
    }

    // Validate RestingECG (must be between 0-2)
    if (isNaN(formData.RestingECG) || formData.RestingECG < 0 || formData.RestingECG > 2) {
      newErrors.RestingECG = "Resting ECG must be between 0 and 2"
    }

    // Validate MaxHR (must be between 60-202)
    if (isNaN(formData.MaxHR) || formData.MaxHR < 60 || formData.MaxHR > 202) {
      newErrors.MaxHR = "Max Heart Rate must be between 60 and 202"
    }

    // Validate ExerciseAngina (must be 0 or 1)
    if (![0, 1].includes(formData.ExerciseAngina)) {
      newErrors.ExerciseAngina = "Exercise Angina must be 0 or 1"
    }

    // Validate Oldpeak (must be a valid float)
    if (isNaN(formData.Oldpeak)) {
      newErrors.Oldpeak = "Oldpeak must be a valid number"
    }

    // Validate ST_Slope (must be between 0-2)
    if (isNaN(formData.ST_Slope) || formData.ST_Slope < 0 || formData.ST_Slope > 2) {
      newErrors.ST_Slope = "ST Slope must be between 0 and 2"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onPredict(formData)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Enter Your Health Data</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age <span className="text-xs text-gray-500">(0-120)</span>
            </label>
            <input
              type="number"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.Age ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter age"
            />
            {errors.Age && <p className="text-red-500 text-xs mt-1">{errors.Age}</p>}
          </div>

          {/* Sex */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
            <select
              name="Sex"
              value={formData.Sex}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value={1}>Male (1)</option>
              <option value={0}>Female (0)</option>
            </select>
            {errors.Sex && <p className="text-red-500 text-xs mt-1">{errors.Sex}</p>}
          </div>

          {/* ChestPainType */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Chest Pain Type</label>
            <select
              name="ChestPainType"
              value={formData.ChestPainType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value={0}>Typical Angina (TA) - 0</option>
              <option value={1}>Atypical Angina (ATA) - 1</option>
              <option value={2}>Non-Anginal Pain (NAP) - 2</option>
              <option value={3}>Asymptomatic (ASY) - 3</option>
            </select>
            {errors.ChestPainType && <p className="text-red-500 text-xs mt-1">{errors.ChestPainType}</p>}
          </div>

          {/* RestingBP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resting BP <span className="text-xs text-gray-500">(0-600)</span>
            </label>
            <input
              type="number"
              name="RestingBP"
              value={formData.RestingBP}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.RestingBP ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter resting BP"
            />
            {errors.RestingBP && <p className="text-red-500 text-xs mt-1">{errors.RestingBP}</p>}
          </div>

          {/* Cholesterol */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cholesterol</label>
            <input
              type="number"
              name="Cholesterol"
              value={formData.Cholesterol}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.Cholesterol ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter cholesterol"
            />
            {errors.Cholesterol && <p className="text-red-500 text-xs mt-1">{errors.Cholesterol}</p>}
          </div>

          {/* FastingBS */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fasting Blood Sugar</label>
            <select
              name="FastingBS"
              value={formData.FastingBS}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value={0}>Less than 120 mg/dl (0)</option>
              <option value={1}>Greater than 120 mg/dl (1)</option>
            </select>
            {errors.FastingBS && <p className="text-red-500 text-xs mt-1">{errors.FastingBS}</p>}
          </div>

          {/* RestingECG */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resting ECG</label>
            <select
              name="RestingECG"
              value={formData.RestingECG}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value={0}>Normal (0)</option>
              <option value={1}>ST (1)</option>
              <option value={2}>LVH (2)</option>
            </select>
            {errors.RestingECG && <p className="text-red-500 text-xs mt-1">{errors.RestingECG}</p>}
          </div>

          {/* MaxHR */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Heart Rate <span className="text-xs text-gray-500">(60-202)</span>
            </label>
            <input
              type="number"
              name="MaxHR"
              value={formData.MaxHR}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.MaxHR ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter max heart rate"
            />
            {errors.MaxHR && <p className="text-red-500 text-xs mt-1">{errors.MaxHR}</p>}
          </div>

          {/* ExerciseAngina */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exercise Induced Angina</label>
            <select
              name="ExerciseAngina"
              value={formData.ExerciseAngina}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value={0}>No (N) - 0</option>
              <option value={1}>Yes (Y) - 1</option>
            </select>
            {errors.ExerciseAngina && <p className="text-red-500 text-xs mt-1">{errors.ExerciseAngina}</p>}
          </div>

          {/* Oldpeak */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Oldpeak</label>
            <input
              type="number"
              step="0.1"
              name="Oldpeak"
              value={formData.Oldpeak}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.Oldpeak ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter oldpeak"
            />
            {errors.Oldpeak && <p className="text-red-500 text-xs mt-1">{errors.Oldpeak}</p>}
          </div>

          {/* ST_Slope */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ST Slope</label>
            <select
              name="ST_Slope"
              value={formData.ST_Slope}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value={1}>Upsloping (1)</option>
              <option value={2}>Flat (2)</option>
              <option value={0}>Downsloping (0)</option>
            </select>
            {errors.ST_Slope && <p className="text-red-500 text-xs mt-1">{errors.ST_Slope}</p>}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Predict Heart Disease"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PredictionForm

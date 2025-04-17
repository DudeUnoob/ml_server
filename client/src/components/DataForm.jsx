"use client"

import { useState, useEffect } from "react"

function DataForm({ addRecord, updateRecord, selectedRecord }) {
  const initialFormState = {
    Age: "",
    Sex: "1", // Default to Male
    ChestPainType: "0", // Default to TA
    RestingBP: "",
    Cholesterol: "",
    FastingBS: "0",
    RestingECG: "0", // Default to Normal
    MaxHR: "",
    ExerciseAngina: "0", // Default to N
    Oldpeak: "",
    ST_Slope: "1", // Default to 1
  }

  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (selectedRecord) {
      // Convert all values to strings for form inputs
      const recordForForm = Object.keys(selectedRecord).reduce((acc, key) => {
        if (key !== "id") {
          acc[key] = String(selectedRecord[key])
        }
        return acc
      }, {})

      setFormData(recordForForm)
    } else {
      setFormData(initialFormState)
    }
  }, [selectedRecord])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
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

    // Validate Age (must be a number between 20-100)
    if (!formData.Age || isNaN(formData.Age) || formData.Age < 20 || formData.Age > 100) {
      newErrors.Age = "Age must be a number between 20 and 100"
    }

    // Validate RestingBP (must be a number between 80-200)
    if (!formData.RestingBP || isNaN(formData.RestingBP) || formData.RestingBP < 80 || formData.RestingBP > 200) {
      newErrors.RestingBP = "Resting BP must be a number between 80 and 200"
    }

    // Validate Cholesterol (must be a number between 100-600)
    if (
      !formData.Cholesterol ||
      isNaN(formData.Cholesterol) ||
      formData.Cholesterol < 100 ||
      formData.Cholesterol > 600
    ) {
      newErrors.Cholesterol = "Cholesterol must be a number between 100 and 600"
    }

    // Validate MaxHR (must be a number between 60-220)
    if (!formData.MaxHR || isNaN(formData.MaxHR) || formData.MaxHR < 60 || formData.MaxHR > 220) {
      newErrors.MaxHR = "Max HR must be a number between 60 and 220"
    }

    // Validate Oldpeak (must be a number between 0-10)
    if (formData.Oldpeak === "" || isNaN(formData.Oldpeak) || formData.Oldpeak < 0 || formData.Oldpeak > 10) {
      newErrors.Oldpeak = "Oldpeak must be a number between 0 and 10"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Convert string values to appropriate types
    const processedData = {
      Age: Number.parseInt(formData.Age),
      Sex: Number.parseInt(formData.Sex),
      ChestPainType: Number.parseInt(formData.ChestPainType),
      RestingBP: Number.parseInt(formData.RestingBP),
      Cholesterol: Number.parseInt(formData.Cholesterol),
      FastingBS: Number.parseInt(formData.FastingBS),
      RestingECG: Number.parseInt(formData.RestingECG),
      MaxHR: Number.parseInt(formData.MaxHR),
      ExerciseAngina: Number.parseInt(formData.ExerciseAngina),
      Oldpeak: Number.parseFloat(formData.Oldpeak),
      ST_Slope: Number.parseInt(formData.ST_Slope),
    }

    if (selectedRecord) {
      updateRecord({ ...processedData, id: selectedRecord.id })
    } else {
      addRecord(processedData)
      setFormData(initialFormState) // Reset form after adding
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{selectedRecord ? "Edit Record" : "Add New Record"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
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
              <option value="1">Male (M)</option>
              <option value="0">Female (F)</option>
            </select>
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
              <option value="0">Typical Angina (TA)</option>
              <option value="1">Atypical Angina (ATA)</option>
              <option value="2">Non-Anginal Pain (NAP)</option>
              <option value="3">Asymptomatic (ASY)</option>
            </select>
          </div>

          {/* RestingBP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resting BP</label>
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
              <option value="0">Less than 120 mg/dl</option>
              <option value="1">Greater than 120 mg/dl</option>
            </select>
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
              <option value="0">Normal</option>
              <option value="1">ST</option>
              <option value="2">LVH</option>
            </select>
          </div>

          {/* MaxHR */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Heart Rate</label>
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
              <option value="0">No (N)</option>
              <option value="1">Yes (Y)</option>
            </select>
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
              <option value="1">Upsloping</option>
              <option value="2">Flat</option>
              <option value="3">Downsloping</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          {selectedRecord && (
            <button
              type="button"
              onClick={() => setFormData(initialFormState)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            {selectedRecord ? "Update Record" : "Add Record"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default DataForm

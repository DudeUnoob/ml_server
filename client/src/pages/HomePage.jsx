"use client"

import { useState, useEffect } from "react"
import PredictionForm from "../components/PredictionForm"
import PredictionResult from "../components/PredictionResult"
import Header from "../components/Header"
import InfoPanel from "../components/InfoPanel"
import ConnectionError from "../components/ConnectionError"


function HomePage() {
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(null)
  const [connectionError, setConnectionError] = useState(false)

  // Check API connection on component mount
  useEffect(() => {
    checkApiConnection()
  }, [])

  const checkApiConnection = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)
  
      // Use the root endpoint with GET method instead
      const response = await fetch("http://127.0.0.1:8000/", {
        method: "GET",
        signal: controller.signal,
      })
  
      clearTimeout(timeoutId)
      setConnectionError(!response.ok)
    } catch (error) {
      console.error("API connection error:", error)
      setConnectionError(true)
    }
  }

  const handlePredict = async (data) => {
    setLoading(true)
    setFormData(data)

    try {
      // Send data to the backend API
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      setPrediction(result.prediction !== undefined ? result.prediction : result)
      setConnectionError(false)
    } catch (error) {
      console.error("Prediction error:", error)
      setConnectionError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setPrediction(null)
    setFormData(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {connectionError ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <ConnectionError onRetry={checkApiConnection} />
              </div>
            ) : prediction === null ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <PredictionForm onPredict={handlePredict} loading={loading} />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <PredictionResult prediction={prediction} formData={formData} onReset={handleReset} />
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <InfoPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

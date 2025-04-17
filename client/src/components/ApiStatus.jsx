"use client"

import { useState, useEffect } from "react"

function ApiStatus() {
  const [status, setStatus] = useState("checking")

  useEffect(() => {
    const checkApiStatus = async () => {
      setStatus("checking") // Set status to checking initially
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        // Check the root endpoint ('/') using GET instead of /predict with HEAD
        const response = await fetch("http://127.0.0.1:8000/", {
          method: "GET", // Use GET method
          signal: controller.signal,
        }).catch(() => ({ ok: false }))

        clearTimeout(timeoutId)
        setStatus(response.ok ? "online" : "offline")
      } catch (error) {
        // Handle fetch errors (like network down)
        if (error.name === 'AbortError') {
          console.log('API status check timed out.');
        } else {
          console.error('API status check failed:', error);
        }
        setStatus("offline")
      }
    }

    checkApiStatus()

    // Check API status every 30 seconds
    const intervalId = setInterval(checkApiStatus, 30000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div className="flex items-center mt-4">
      <div className="text-sm">API Status:</div>
      <div className="flex items-center ml-2">
        <div
          className={`w-3 h-3 rounded-full mr-2 ${
            status === "checking" ? "bg-yellow-500" : status === "online" ? "bg-green-500" : "bg-red-500"
          }`}
        ></div>
        <span className="text-sm">
          {status === "checking" ? "Checking..." : status === "online" ? "Connected" : "Disconnected"}
        </span>
      </div>
    </div>
  )
}

export default ApiStatus

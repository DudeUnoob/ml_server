"use client"

function ConnectionError({ onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-red-500 mx-auto mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h3 className="text-lg font-semibold text-red-800 mb-2">Connection Error</h3>
      <p className="text-red-600 mb-4">
        Unable to connect to the prediction API. Please make sure the backend server is running at:
      </p>
      <p className="font-mono bg-red-100 p-2 rounded mb-4">http://127.0.0.1:8000/predict</p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button onClick={onRetry} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
          Retry Connection
        </button>
        <button
          onClick={() => window.open("http://127.0.0.1:8000/docs", "_blank")}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Open API Docs
        </button>
      </div>
    </div>
  )
}

export default ConnectionError

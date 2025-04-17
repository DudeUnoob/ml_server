import ApiStatus from "./ApiStatus"

function Header() {
  return (
    <header className="bg-gradient-to-r from-red-600 to-red-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-3xl font-bold">Heart Disease Predictor</h1>
            <p className="mt-2 text-gray-100">Enter your health metrics to predict heart disease risk</p>
          </div>
          <ApiStatus />
        </div>
      </div>
    </header>
  )
}

export default Header

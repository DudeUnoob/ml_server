import { Routes, Route, Link, Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage' // Placeholder for Home page
import AboutPage from './pages/AboutPage' // Placeholder for About page

// Basic Layout component including navigation


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}> {/* Use Layout for nested routes */}
       
        
        {/* Add other routes here */}
      </Route>

      <Route path="*" element={<NotFoundPage />} /> {/* Catch-all route */}

      <Route path="/about" element={<AboutPage />} />
    </Routes>
  )
}

// Simple NotFoundPage component
function NotFoundPage() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      <Link to="/" className="text-indigo-600 hover:underline">Go back home</Link>
    </div>
  );
}

export default App

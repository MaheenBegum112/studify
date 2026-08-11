import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white border-b border-gray-200">
      
      {/* Logo */}
      <div className="text-xl font-bold text-indigo-600">
        📚 Studify
      </div>

      {/* Links */}
      <div className="flex gap-8">
        <Link to="/" className="text-sm text-gray-600 hover:text-indigo-600">Home</Link>
        <Link to="/tasks" className="text-sm text-gray-600 hover:text-indigo-600">Tasks</Link>
        <Link to="/plan" className="text-sm text-gray-600 hover:text-indigo-600">Study Plan</Link>
        <Link to="/summary" className="text-sm text-gray-600 hover:text-indigo-600">Summary</Link>
      </div>

      {/* Button */}
      <Link to="/tasks">
        <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700">
          Get Started
        </button>
      </Link>

    </nav>
  )
}

export default Navbar
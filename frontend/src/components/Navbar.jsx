import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200">
      
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Studify Logo" className="h-14 " />
       
      </div>

      {/* Links */}
      <div className="flex gap-8">
        <Link to="/" className="text-sm text-gray-600 hover:text-purple-600">Home</Link>
        <Link to="/tasks" className="text-sm text-gray-600 hover:text-purple-600">Tasks</Link>
        <Link to="/plan" className="text-sm text-gray-600 hover:text-purple-600">Study Plan</Link>
        <Link to="/summary" className="text-sm text-gray-600 hover:text-purple-600">Summary</Link>
      </div>

      {/* Button */}
      <Link to="/tasks">
        <button className="bg-purple-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-purple-700">
          Get Started
        </button>
      </Link>

    </nav>
  )
}

export default Navbar
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Tasks from './components/Tasks'
import Summary from './pages/Summary'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Tasks" element={<Tasks/>}/>
          <Route path="/Summary" element={<Summary/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
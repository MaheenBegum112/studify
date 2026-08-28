import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './Home';
import StudyPlan from './components/StudyPlan';
import Tasks from './components/Tasks';
import Summary from './components/Summary'


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
         <Route path="/tasks"element={<Tasks/>}/>
          <Route path="/Summary" element={<Summary/>}/>
          <Route path="/plan" element={<StudyPlan/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

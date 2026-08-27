import { Link } from 'react-router-dom'
import task from './assets/task.png';
import whatsapp from "./assets/whatsapp.png";
import ai from "./assets/ai.png";

function Home() {
  return (
    <div>

      {/* ========== HERO SECTION ========== */}
      <div className="flex justify-between items-center px-20 py-12 bg-purple-50">
        {/* Left — Text */}
        <div className="w-1/2">
          <span className="bg-purple-200 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">
            AI Powered Study Planner
          </span>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mt-4">
            Never Miss a <br />
            <span className="text-purple-600">Deadline</span> Again
          </h1>
          <p className="text-gray-500 mt-6 text-lg">
            Studify helps you manage assignments, exams and deadlines smartly.
            Let AI plan your day and get WhatsApp reminders automatically.
          </p>
          <div className="flex gap-4 mt-8">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700">
              Get Started →
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50">
              Learn More
            </button>
          </div>
        </div>

        {/* Right — Image */}
        <div className="w-1/2 flex justify-center">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg"
            alt="Student studying"
            className="w-80 rounded-3xl shadow-md"
          />
        </div>
      </div>

      {/* ========== HOW IT WORKS SECTION ========== */}
<div className="bg-white px-20 py-20">

  <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
    How It Works
  </h2>

  <p className="text-center text-gray-500 mb-12">
    Three simple steps to never miss a deadline again
  </p>

  <div className="flex justify-between gap-8">

    {/* CARD 1 */}
    <div className="bg-white rounded-2xl p-5 w-1/3 shadow-lg border border-gray-100">

      <div className="flex justify-between items-start">

        <div className="w-28 h-20 rounded-2xl overflow-hidden">
          <img
            src={task}
            alt="Add Your Tasks"
            className="w-15 h-15 object-contain"
          />
        </div>

        <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
          1
        </div>

      </div>

      <h3 className="text-xl font-bold text-gray-800 mt-4 mb-3">
        Add Your Tasks
      </h3>

      <p className="text-gray-500 text-base leading-7">
        Add assignments, exams and deadlines with subject and priority level
      </p>

      <div className="mt-6 space-y-4 text-gray-700">

        <p>
          <span className="text-green-500 font-bold mr-3">✓</span>
          Add assignments, exams & deadlines
        </p>

        <p>
          <span className="text-green-500 font-bold mr-3">✓</span>
          Set subject and priority
        </p>

        <p>
          <span className="text-green-500 font-bold mr-3">✓</span>
          Keep all your tasks in one place
        </p>

      </div>

      <Link
        to="/tasks"
        className="inline-block mt-8 text-purple-600 font-bold text-lg"
      >
        Get Started →
      </Link>

    </div>


    {/* CARD 2 */}
    <div className="bg-white rounded-2xl p-5 w-1/3 shadow-lg border border-gray-100">

      <div className="flex justify-between items-start">

        <div className="w-28 h-25 rounded-2xl overflow-hidden">
          <img
            src={ai}
            alt="AI Plans Your Day"
            className="w-15 h-15  object-contain"
          />
        </div>

        <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
          2
        </div>

      </div>

      <h3 className="text-xl font-bold text-gray-800 mt-1 mb-3">
        AI Plans Your Day
      </h3>

      <p className="text-gray-500 text-base leading-7">
        Groq AI analyzes your schedule and generates a personalized hourly study plan
      </p>

      <div className="mt-6 space-y-4 text-gray-700">

        <p>
          <span className="text-green-500 font-bold mr-3">✓</span>
          AI analyzes your tasks
        </p>

        <p>
          <span className="text-green-500 font-bold mr-3">✓</span>
          Creates a smart hourly study plan
        </p>

        <p>
          <span className="text-green-500 font-bold mr-3">✓</span>
          Optimize your time effectively
        </p>

      </div>

      <Link
        to="/plan"
        className="inline-block mt-8 text-orange-500 font-bold text-lg"
      >
        See Study Plan →
      </Link>

    </div>


    {/* CARD 3 */}
    <div className="bg-white rounded-2xl p-5 w-1/3 shadow-lg border border-gray-100">

      <div className="flex justify-between items-start">

        <div className="w-24 h-22 rounded-2xl overflow-hidden">
          <img
            src={whatsapp}
            alt="WhatsApp Alerts"
            className="w-15 h-15 object-contain"
          />
        </div>

        <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
          3
        </div>

      </div>

      <h3 className="text-xl font-bold text-gray-800 mt-3 mb-3">
        Get WhatsApp Alerts
      </h3>

      <p className="text-gray-500 text-base leading-7">
        Get automatic WhatsApp reminders when your deadlines are approaching
      </p>

      <div className="mt-6 space-y-4 text-gray-700">

        <p>
          <span className="text-green-500 font-bold mr-3">✓</span>
          Timely WhatsApp reminders
        </p>

        <p>
          <span className="text-green-500 font-bold mr-3">✓</span>
          Never miss an important deadline
        </p>

        <p>
          <span className="text-green-500 font-bold mr-3">✓</span>
          Stay on track, stress-free
        </p>

      </div>

      <Link
        to="/"
        className="inline-block mt-8 text-green-600 font-bold text-lg"
      >
        Learn More →
      </Link>

    </div>

  </div>

</div>
{/* ========== FEATURES SECTION ========== */} 
<div className="px-20 py-20 bg-gray-50"> <h2 className="text-3xl font-bold text-center text-gray-900 mb-4"> Features </h2>
 <p className="text-center text-gray-500 mb-12"> 
  Everything you need to stay on top of your studies </p> 
 <div className="grid grid-cols-2 gap-8"> <div className="bg-white rounded-xl p-6 shadow-sm"> 
  <div className="text-3xl mb-3">📅</div> <h3 className="text-lg font-bold text-gray-800 mb-2">Smart Scheduling</h3>
   <p className="text-gray-500 text-sm"> Automatically organizes your tasks by deadline and priority so you always know what to do first </p> 
   </div> 
   <div className="bg-white rounded-xl p-6 shadow-sm"> <div className="text-3xl mb-3">🤖</div>
    <h3 className="text-lg font-bold text-gray-800 mb-2">AI Study Plan</h3> <p className="text-gray-500 text-sm">
       Groq AI generates a personalized hourly study plan based on your deadlines and available time </p> </div> 
       <div className="bg-white rounded-xl p-6 shadow-sm"> <div className="text-3xl mb-3">📱</div> 
       <h3 className="text-lg font-bold text-gray-800 mb-2">WhatsApp Reminders</h3> <p className="text-gray-500 text-sm"> 
        Get automatic WhatsApp messages when your deadlines are close so you never forget </p> </div> <div className="bg-white rounded-xl p-6 shadow-sm">
           <div className="text-3xl mb-3">📊</div> <h3 className="text-lg font-bold text-gray-800 mb-2">Weekly Summary</h3> <p className="text-gray-500 text-sm"> 
            Every Sunday get an AI generated summary — tasks completed, missed and suggestions for next week </p> 
            </div>
             </div>
              </div>

      {/* ========== FOOTER ========== */}
      <div className="bg-gray-900 text-white px-20 py-10">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-purple-400">📚 Studify</div>
          <p className="text-gray-400 text-sm">© 2026 Studify. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/" className="text-gray-400 text-sm hover:text-white">Home</Link>
            <Link to="/tasks" className="text-gray-400 text-sm hover:text-white">Tasks</Link>
            <Link to="/plan" className="text-gray-400 text-sm hover:text-white">Study Plan</Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home